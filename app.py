import os
import uuid
import json
from functools import wraps
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, make_response, flash
)
from flask_sqlalchemy import SQLAlchemy
from flask_compress import Compress
from flask_caching import Cache
from flask_wtf.csrf import CSRFProtect
from flask_talisman import Talisman
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

# ---------------- CONFIGURATION ----------------
app = Flask(__name__)

# مفتاح سري آمن
app.secret_key = os.getenv("SECRET_KEY", "secure_random_key_998877")

# --- الربط الذكي مع PostgreSQL ---
LOCAL_DATABASE_URL = "postgresql://belgium_guide_user:miRfoHq1WHmM8Rtj7MPyDf68vRzBKteA@dpg-d5nnvb9r0fns73fmts50-a.frankfurt-postgres.render.com/belgium_guide"

# ريندر يستخدم DATABASE_URL، وإذا لم يوجد يستخدم الرابط الخارجي
database_uri = os.environ.get("DATABASE_URL", LOCAL_DATABASE_URL)

if database_uri.startswith("postgres://"):
    database_uri = database_uri.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# -----------------------------------------------
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'customer_login'  # اسم الدالة التي تفتح صفحة تسجيل الدخول

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

csrf = CSRFProtect(app)
Talisman(app, content_security_policy=None, force_https=False)

app.config.update(
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax',
    MAX_CONTENT_LENGTH=5 * 1024 * 1024
)

db = SQLAlchemy(app)
Compress(app)
cache = Cache(app, config={"CACHE_TYPE": "simple"})

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ---------------- MODELS ----------------
class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    type = db.Column(db.String(50))
    city = db.Column(db.String(50), index=True)
    address = db.Column(db.String(200))
    website = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    desc = db.Column(db.Text)
    rating = db.Column(db.Float, default=0)
    category = db.Column(db.String(50), nullable=True)
    views = db.Column(db.Integer, default=0)
    hours = db.Column(db.JSON)
    popular_items = db.Column(db.String(200))
    artr = db.Column(db.String(100))
    images = db.relationship("StoreImage", cascade="all, delete-orphan", backref="store", lazy="joined")
    products = db.relationship("Product", cascade="all, delete-orphan", backref="store", lazy="dynamic")

class StoreRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50))
    city = db.Column(db.String(50))
    address = db.Column(db.String(200))
    website = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    desc = db.Column(db.Text)
    hours = db.Column(db.JSON)
    status = db.Column(db.String(20), default="pending")
    artr = db.Column(db.String(100))
    logo = db.Column(db.String(100), default='default_logo.png')

class StoreImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200))
    store_id = db.Column(db.Integer, db.ForeignKey("store.id"))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(200))
    price_before = db.Column(db.Numeric(10, 2), nullable=True)
    price_after = db.Column(db.Numeric(10, 2), nullable=True)
    has_offer = db.Column(db.Boolean, default=False)
    offer_start = db.Column(db.Date, nullable=True)
    offer_end = db.Column(db.Date, nullable=True)
    notes = db.Column(db.Text)
    barcode = db.Column(db.String(200), nullable=True)
    store_id = db.Column(db.Integer, db.ForeignKey("store.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(200))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'))

# ---------------- HELPERS ----------------
def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("admin"):
            return redirect(url_for("admin_login"))
        return f(*args, **kwargs)
    return decorated

@app.template_filter('from_json')
def from_json_filter(value):
    if value:
        if isinstance(value, dict):
            return value
        try:
            return json.loads(value)
        except:
            return {}
    return {}

# ---------------- ROUTES ----------------

@app.route("/admin/store/<int:store_id>/view-products")
def view_products(store_id):
    store = Store.query.get_or_404(store_id)
    products = Product.query.filter_by(store_id=store_id).all()
    return render_template("view-products.html", store=store, products=products)

# ---------------- PUBLIC ROUTES ----------------
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/market")
def market():
    search = request.args.get("q", "").strip()
    city = request.args.get("city", "").strip()
    query = Store.query.filter(Store.type.in_(["market", "winkel"]))
    if search:
        query = query.filter(Store.name.ilike(f"%{search}%"))
    if city:
        query = query.filter(Store.city.ilike(f"%{city}%"))
    return render_template("market.html", stores=query.all(), search=search, city=city)

def generic_store_route(template_name, store_type):
    q = request.args.get('q', '').strip()
    query = Store.query.filter_by(type=store_type)
    if q:
        query = query.filter((Store.name.ilike(f"%{q}%")) | (Store.city.ilike(f"%{q}%")))
    return render_template(f"{template_name}.html", stores=query.all())

@app.route("/resturant")
def resturant():
    return generic_store_route("resturant", "resturant")

@app.route("/taxi")
def taxi():
    return generic_store_route("taxi", "taxi")

@app.route("/slag")
def slag():
    return generic_store_route("slag", "slag")

@app.route("/garag")
def garag():
    return generic_store_route("garag", "garag")

@app.route("/taal")
def taal():
    return generic_store_route("taal", "taal")

@app.route("/lawyer")
def lawyer():
    return generic_store_route("lawyer", "lawyer")

@app.route("/translate")
def translate():
    return generic_store_route("translate", "translate")

@app.route("/rijscholen")
def rijscholen():
    return generic_store_route("rijscholen", "rijscholen")

@app.route("/werrk")
def werk():
    return generic_store_route("werrk", "werrk")

@app.route("/ekama")
def ekama():
    return generic_store_route("ekama", "ekama")

@app.route("/anderresturant")
def anderresturant():
    return generic_store_route("anderresturant", "anderresturant")

@app.route("/arabisch")
def arabisch():
    return generic_store_route("arabisch", "arabisch")

@app.route("/turkish")
def turkish():
    return generic_store_route("turkish", "turkish")

@app.route("/sweets")
def sweets():
    stores = Store.query.filter_by(category='sweets').all()
    return render_template('sweets.html', stores=stores)

@app.route("/verblijf")
def verblijf():
    stores = Store.query.filter_by(category='verblijf').all()
    return render_template('verblijf.html', stores=stores)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/store/<int:store_id>")
def store_details(store_id):
    store = Store.query.get_or_404(store_id)
    store.views += 1
    db.session.commit()
    return render_template("storedetails.html", store=store)

@app.route("/contact")
def contact():
    return render_template("contact.html")

# ---------------- AUTH (CUSTOMER) ----------------
@app.route("/customer-login", methods=["GET", "POST"])
def customer_login():
    if current_user.is_authenticated:
        return redirect(url_for('manage_products', store_id=current_user.store_id))
    
    if request.method == "POST":
        u_name = request.form.get("username")
        p_word = request.form.get("password")
        user = User.query.filter_by(username=u_name).first()
        
        if user and check_password_hash(user.password, p_word):
            login_user(user)
            flash(f"مرحباً بك مجدداً، {user.username}!", "success")
            return redirect(url_for('manage_products', store_id=user.store_id))
        else:
            flash("❌ بيانات الدخول غير صحيحة أو الحساب غير موجود")
            
    return render_template("customer.html")

# ---------------- DELETE IMAGE ROUTE ----------------
@app.route("/admin/delete-image/<int:image_id>", methods=["POST"])
@admin_required
def delete_image(image_id):
    try:
        img = StoreImage.query.get_or_404(image_id)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], img.filename)
        if os.path.exists(image_path):
            os.remove(image_path)
        db.session.delete(img)
        db.session.commit()
        flash("✅ تم حذف الصورة بنجاح")
    except Exception as e:
        db.session.rollback()
        flash(f"❌ خطأ أثناء حذف الصورة: {str(e)}")
    
    return redirect(request.referrer or url_for('admin_panel'))

# ---------------- ADMIN ROUTES ----------------
@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if session.get("admin"):
        return redirect(url_for("admin_panel"))

    if request.method == "POST":
        u_name = request.form.get("username")
        p_word = request.form.get("password")
        
        admin = Admin.query.filter_by(username=u_name).first()
        
        if admin and check_password_hash(admin.password, p_word):
            session.clear()
            session["admin"] = admin.id
            session.permanent = True 
            flash("✅ تم تسجيل دخول المسؤول بنجاح", "success")
            return redirect(url_for("admin_panel"))
        
        flash("❌ بيانات الدخول غير صحيحة")
        
    return render_template("admin_login.html")

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    flash("✅ تم تسجيل الخروج")
    return redirect(url_for("admin_login"))

@app.route("/admin/panel", methods=["GET", "POST"])
@admin_required
def admin_panel():
    if request.method == "POST":
        try:
            week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            hours_data = {}
            for day in week_days:
                open_t = request.form.get(f"{day}_open")
                close_t = request.form.get(f"{day}_close")
                hours_data[day] = {"open": open_t, "close": close_t} if open_t and close_t else None

            new_store = Store(
                name=request.form.get("name"),
                type=request.form.get("type"),
                city=request.form.get("city"),
                address=request.form.get("address"),
                phone=request.form.get("phone"),
                website=request.form.get("website"),
                desc=request.form.get("desc"),
                rating=float(request.form.get("rating") or 0),
                popular_items=request.form.get("popular_items"),
                artr=request.form.get("artr"),
                hours=hours_data 
            )
            db.session.add(new_store)
            db.session.flush()

            if 'images' in request.files:
                for file in request.files.getlist("images"):
                    if file and allowed_file(file.filename):
                        unique_name = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
                        file.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_name))
                        db.session.add(StoreImage(filename=unique_name, store_id=new_store.id))

            db.session.commit()
            flash("✅ تم إضافة المتجر بنجاح!")
        except Exception as e:
            db.session.rollback()
            flash(f"❌ حدث خطأ: {str(e)}")
        return redirect(url_for("admin_panel"))

    stores = Store.query.all()
    return render_template("admin_panel.html", stores=stores)

@app.route("/admin/requests")
@admin_required
def view_requests():
    reqs = StoreRequest.query.filter_by(status="pending").all()
    return render_template("admin_requests.html", requests=reqs)

@app.route("/admin/change-password", methods=["GET", "POST"])
@admin_required
def change_password():
    try:
        if request.method == "POST":
            current = request.form.get("current")
            new = request.form.get("new")
            confirm = request.form.get("confirm")
            admin = Admin.query.get(session["admin"])
            if not check_password_hash(admin.password, current):
                flash("❌ كلمة المرور الحالية خاطئة")
            elif new != confirm:
                flash("❌ كلمة المرور غير متطابقة")
            else:
                admin.password = generate_password_hash(new)
                db.session.commit()
                flash("✅ تم تغيير كلمة المرور بنجاح")
                return redirect(url_for("admin_panel"))
        return render_template("change_password.html")
    except Exception as e:
        db.session.rollback()
        flash(f"❌ خطأ تقني: {str(e)}")
        return redirect(url_for("admin_panel"))

@app.route("/admin/edit/<int:store_id>", methods=["GET", "POST"])
@admin_required
def edit_store(store_id):
    store = Store.query.get_or_404(store_id)
    try:
        if request.method == "POST":
            store.name = request.form.get("name")
            store.type = request.form.get("type")
            store.city = request.form.get("city")
            store.address = request.form.get("address")
            store.website = request.form.get("website")
            store.phone = request.form.get("phone")
            store.desc = request.form.get("desc")
            store.rating = float(request.form.get("rating") or 0)
            store.artr = request.form.get("artr")
            store.popular_items = request.form.get("popular_items")

            week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            hours_data = {}
            for day in week_days:
                open_t = request.form.get(f"{day}_open")
                close_t = request.form.get(f"{day}_close")
                hours_data[day] = {"open": open_t, "close": close_t} if open_t and close_t else None
            store.hours = hours_data

            if 'images' in request.files:
                for file in request.files.getlist('images'):
                    if file and allowed_file(file.filename):
                        unique_name = f"{uuid.uuid4().hex}_{secure_filename(file.filename)}"
                        file.save(os.path.join(app.config["UPLOAD_FOLDER"], unique_name))
                        new_img = StoreImage(filename=unique_name, store_id=store.id)
                        db.session.add(new_img)

            db.session.commit()
            flash("✅ تم تحديث بيانات المتجر بنجاح")
            return redirect(url_for("admin_panel"))

        return render_template("editstore.html", store=store)

    except Exception as e:
        db.session.rollback()
        flash(f"❌ خطأ تقني: {str(e)}")
        return redirect(url_for("admin_panel"))

@app.route("/admin/approve/<int:req_id>", methods=["POST"])
@admin_required
def approve_request(req_id):
    try:
        req = StoreRequest.query.get_or_404(req_id)
        new_store = Store(
            name=req.name, type=req.type, city=req.city,
            address=req.address, website=req.website,
            phone=req.phone, desc=req.desc, hours=req.hours
        )
        db.session.add(new_store)
        req.status = "approved"
        db.session.commit()
        flash(f"✅ تمت الموافقة على {req.name}.")
    except Exception as e:
        db.session.rollback()
        flash("❌ فشل التفعيل.")
    return redirect(url_for('view_requests'))

@app.route("/join-us", methods=["GET", "POST"])
def join_us():
    if request.method == "POST":
        try:
            days_ar = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
            days_en = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            hours_dict = {}
            for i, d_ar in enumerate(days_ar):
                open_t = request.form.get(f"open_{d_ar}")
                close_t = request.form.get(f"close_{d_ar}")
                hours_dict[days_en[i]] = {"open": open_t, "close": close_t} if open_t and close_t else None

            new_request = StoreRequest(
                name=request.form.get("name"), type=request.form.get("type"),
                city=request.form.get("city"), address=request.form.get("address"),
                phone=request.form.get("phone"), email=request.form.get("email"),
                website=request.form.get("website"), desc=request.form.get("desc"),
                hours=hours_dict, artr=request.form.get("artr")
            )
            db.session.add(new_request)
            db.session.commit()
            flash("✅ تم إرسال طلبك بنجاح!")
            return redirect(url_for('index'))
        except Exception as e:
            db.session.rollback()
            flash(f"❌ خطأ: {str(e)}")
    return render_template("join_us.html")

@app.route("/admin/delete/<int:store_id>", methods=["POST"])
@admin_required
def delete_store(store_id):
    store = Store.query.get_or_404(store_id)
    for img in store.images:
        path = os.path.join(app.config["UPLOAD_FOLDER"], img.filename)
        if os.path.exists(path):
            os.remove(path)
    db.session.delete(store)
    db.session.commit()
    flash("🗑️ تم حذف المتجر")
    return redirect(url_for("admin_panel"))

# ---------------- PRODUCTS (CUSTOMER) ----------------
@app.route("/admin/store/<int:store_id>/add-product", methods=["POST"])
@login_required
def add_product(store_id):
    if current_user.store_id != store_id:
        flash("🚫 غير مصرح لك بالإضافة لهذا المتجر")
        return redirect(url_for('customer_login'))

    try:
        p_name = request.form.get("product_name")
        p_barcode = request.form.get("barcode") or None
        
        existing_name = Product.query.filter_by(store_id=store_id, name=p_name).first()
        if existing_name:
            flash(f"❌ خطأ: المنتج '{p_name}' موجود بالفعل في متجرك!")
            return redirect(url_for('manage_products', store_id=store_id))

        if p_barcode:
            existing_barcode = Product.query.filter_by(barcode=p_barcode).first()
            if existing_barcode:
                flash("⚠️ هذا الباركود مسجل مسبقاً لمنتج آخر في النظام")
                return redirect(request.referrer)

        filename = "default_product.png"
        if 'product_image' in request.files:
            file = request.files['product_image']
            if file and file.filename != '' and allowed_file(file.filename):
                filename = f"prod_{uuid.uuid4().hex}_{secure_filename(file.filename)}"
                file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))

        p_before = float(request.form.get("price_before") or 0.0)
        p_after = float(request.form.get("price_after") or 0.0)
        
        new_product = Product(
            name=p_name,
            barcode=p_barcode,
            price_before=p_before,
            price_after=p_after,
            image=filename,
            store_id=store_id
        )
        
        db.session.add(new_product)
        db.session.commit()
        flash("✅ تم إضافة الصنف بنجاح")
        
    except Exception as e:
        db.session.rollback()
        flash(f"❌ حدث خطأ تقني: {str(e)}")
    
    return redirect(url_for('manage_products', store_id=store_id))

@app.route("/admin/store/<int:store_id>/manage")
@login_required
def manage_products(store_id):
    if hasattr(current_user, 'store_id') and current_user.store_id:
        if current_user.store_id != store_id:
            flash("🚫 غير مصرح لك بدخول هذا المتجر")
            return redirect(url_for('customer_login'))
    
    store = Store.query.get_or_404(store_id)
    return render_template("manageproducts.html", store=store)

@app.route("/admin/product/edit/<int:product_id>", methods=["POST"])
@login_required
def edit_product(product_id):
    product = Product.query.get_or_404(product_id)
    
    if hasattr(current_user, 'store_id') and current_user.store_id:
        if current_user.store_id != product.store_id:
            flash("🚫 غير مصرح لك بالتعديل")
            return redirect(url_for('customer_login'))

    try:
        product.name = request.form.get("product_name")
        product.barcode = request.form.get("barcode") or None
        product.price_before = float(request.form.get("price_before") or 0)
        product.price_after = float(request.form.get("price_after") or 0)
        product.has_offer = 'has_offer' in request.form

        p_barcode = request.form.get("barcode")
        if p_barcode:
            existing_barcode = Product.query.filter_by(barcode=p_barcode).first()
            if existing_barcode and existing_barcode.id != product.id:
                flash("⚠️ هذا الباركود مسجل مسبقاً لمنتج آخر في النظام")
                return redirect(request.referrer)

        if 'product_image' in request.files:
            file = request.files['product_image']
            if file and file.filename != '' and allowed_file(file.filename):
                filename = f"prod_{uuid.uuid4().hex}_{secure_filename(file.filename)}"
                file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
                product.image = filename

        db.session.commit()
        flash("✅ تم تحديث بيانات الصنف بنجاح")
    except Exception as e:
        db.session.rollback()
        flash(f"❌ خطأ: {str(e)}")

    return redirect(url_for('manage_products', store_id=product.store_id))

@app.route("/admin/create-customer", methods=["GET", "POST"])
@admin_required
def create_customer():
    stores = Store.query.all()
    if request.method == "POST":
        u_name = request.form.get("username", "").strip()
        p_word = request.form.get("password")
        s_id = request.form.get("store_id")

        if not u_name or not p_word or not s_id:
            flash("⚠️ يرجى ملء جميع الحقول المطلوبة")
            return redirect(url_for('create_customer'))
        
        if User.query.filter_by(username=u_name).first():
            flash("❌ اسم المستخدم هذا موجود مسبقاً")
            return redirect(url_for('create_customer'))
            
        try:
            new_user = User(
                username=u_name,
                password=generate_password_hash(p_word, method='pbkdf2:sha256'),
                store_id=int(s_id)
            )
            db.session.add(new_user)
            db.session.commit()
            flash(f"✅ تم إنشاء حساب للزبون {u_name} بنجاح")
            return redirect(url_for('admin_panel'))
            
        except Exception as e:
            db.session.rollback()
            flash(f"❌ حدث خطأ أثناء حفظ البيانات: {str(e)}")
            return redirect(url_for('create_customer'))
        
    return render_template("create_customer.html", stores=stores)

@app.route("/admin/product/delete/<int:product_id>", methods=["POST"])
@login_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    store_id = product.store_id
    
    if hasattr(current_user, 'store_id') and current_user.store_id:
        if current_user.store_id != store_id:
            flash("🚫 غير مصرح لك بالحذف")
            return redirect(url_for('customer_login'))
            
    try:
        db.session.delete(product)
        db.session.commit()
        flash("🗑️ تم حذف المنتج بنجاح")
    except Exception as e:
        db.session.rollback()
        flash(f"❌ خطأ أثناء الحذف: {str(e)}")
        
    return redirect(url_for('manage_products', store_id=store_id))

# ---------------- INITIALIZATION ----------------
with app.app_context():
    try:
        db.create_all()
        if not Admin.query.filter_by(username="admin").first():
            db.session.add(Admin(username="admin", password=generate_password_hash("admin123")))
            db.session.commit()
            print("Admin user created successfully.")
    except Exception as e:
        print(f"Init Error: {e}")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
