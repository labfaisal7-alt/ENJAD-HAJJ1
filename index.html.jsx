import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Ambulance,
  BarChart3,
  Bell,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileText,
  HeartPulse,
  Home,
  Lock,
  MapPin,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const navItems = [
  { key: "dashboard", label: "الرئيسية", icon: Home },
  { key: "new", label: "بلاغ جديد", icon: Plus },
  { key: "incidents", label: "البلاغات", icon: ClipboardList },
  { key: "reports", label: "التقارير", icon: BarChart3 },
  { key: "users", label: "المستخدمون", icon: Users },
  { key: "settings", label: "الأمان والصلاحيات", icon: ShieldCheck },
];

const sampleIncidents = [
  { id: "INC-2026-0018", type: "حادث مروري", city: "الرياض", status: "قيد المراجعة", patients: 2, severity: "متوسط", time: "10:42" },
  { id: "INC-2026-0017", type: "إغماء", city: "الرياض", status: "مغلق", patients: 1, severity: "بسيط", time: "09:15" },
  { id: "INC-2026-0016", type: "ضيق تنفس", city: "الدرعية", status: "قيد الاستكمال", patients: 1, severity: "حرج", time: "08:30" },
];

const Field = ({ label, placeholder, type = "text" }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50"
    />
  </label>
);

const SelectField = ({ label, options }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
    <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-4 focus:ring-red-50">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);

const StatCard = ({ title, value, icon: Icon, hint }) => (
  <Card className="rounded-3xl border-0 shadow-sm">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-xs text-slate-400">{hint}</p>
        </div>
        <div className="rounded-2xl bg-red-50 p-3 text-red-600">
          <Icon size={24} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const StatusBadge = ({ status }) => {
  const styles = {
    "مغلق": "bg-emerald-50 text-emerald-700",
    "قيد المراجعة": "bg-amber-50 text-amber-700",
    "قيد الاستكمال": "bg-blue-50 text-blue-700",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status] || "bg-slate-100 text-slate-700"}`}>{status}</span>;
};

function LoginScreen({ onLogin }) {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-900 to-slate-950" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0, transparent 28%), radial-gradient(circle at 80% 70%, white 0, transparent 22%)" }} />
          <div className="relative flex h-full flex-col justify-between p-12">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
                <Ambulance size={34} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">بوابة المسعفين الميدانيين</h1>
                <p className="text-sm text-white/70">تسجيل البلاغات والحالات الإسعافية</p>
              </div>
            </div>
            <div className="max-w-md">
              <h2 className="text-4xl font-black leading-tight">منصة آمنة لجمع بيانات الحالات وتحويلها إلى إحصائيات دقيقة.</h2>
              <p className="mt-5 text-white/70">مصممة للعمل الميداني: سرعة إدخال، صلاحيات واضحة، وسجل تدقيق لكل عملية.</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <ShieldCheck size={18} />
              <span>حماية البيانات وتقليل الوصول حسب الدور</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-50 p-6 text-slate-900">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <div className="mb-8 text-center lg:hidden">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-600 text-white">
                <Ambulance size={32} />
              </div>
              <h1 className="text-2xl font-bold">بوابة المسعفين</h1>
            </div>
            <Card className="rounded-3xl border-0 shadow-xl shadow-slate-200/70">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold">تسجيل الدخول</h2>
                <p className="mt-2 text-sm text-slate-500">ادخل بياناتك للوصول إلى لوحة العمليات.</p>
                <div className="mt-6 space-y-4">
                  <Field label="رقم الجوال أو البريد" placeholder="05xxxxxxxx" />
                  <Field label="كلمة المرور" placeholder="••••••••" type="password" />
                  <Button onClick={onLogin} className="mt-2 w-full rounded-2xl bg-red-600 py-6 text-base hover:bg-red-700">
                    دخول آمن
                    <Lock className="mr-2" size={18} />
                  </Button>
                </div>
                <p className="mt-5 text-center text-xs text-slate-400">سيتم لاحقًا تفعيل رمز تحقق OTP للمسعفين.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive }) {
  return (
    <aside className="hidden w-72 shrink-0 border-l border-slate-100 bg-white p-5 lg:block">
      <div className="flex items-center gap-3 rounded-3xl bg-slate-950 p-4 text-white">
        <div className="rounded-2xl bg-red-600 p-3">
          <HeartPulse size={24} />
        </div>
        <div>
          <p className="font-bold">جمعية الإسعاف التطوعي</p>
          <p className="text-xs text-white/60">بوابة العمليات</p>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? "bg-red-50 text-red-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Header({ active, setActive }) {
  const title = navItems.find((item) => item.key === active)?.label || "الرئيسية";
  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-slate-50/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-2xl lg:hidden">
            <Menu size={18} />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500">مرحبًا، فيصل — قائد فريق ميداني</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setActive("new")} className="rounded-2xl bg-red-600 hover:bg-red-700">
            بلاغ جديد
            <Plus className="mr-2" size={17} />
          </Button>
          <button className="rounded-2xl bg-white p-3 text-slate-500 shadow-sm">
            <Bell size={18} />
          </button>
          <button className="rounded-2xl bg-white p-3 text-slate-500 shadow-sm">
            <UserRound size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Dashboard({ setActive }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="بلاغات اليوم" value="18" icon={ClipboardList} hint="+12% عن متوسط الأسبوع" />
        <StatCard title="عدد المصابين" value="27" icon={Activity} hint="3 حالات حرجة" />
        <StatCard title="متوسط زمن الوصول" value="08 د" icon={Clock} hint="من وقت البلاغ إلى الوصول" />
        <StatCard title="بلاغات مغلقة" value="14" icon={CheckCircle2} hint="4 قيد المراجعة" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="rounded-3xl border-0 shadow-sm xl:col-span-2">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">آخر البلاغات</h2>
                <p className="text-sm text-slate-500">متابعة الحالات المسجلة من الفرق الميدانية</p>
              </div>
              <Button variant="outline" onClick={() => setActive("incidents")} className="rounded-2xl">عرض الكل</Button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-4">رقم البلاغ</th>
                    <th className="p-4">النوع</th>
                    <th className="p-4">المدينة</th>
                    <th className="p-4">المصابين</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sampleIncidents.map((incident) => (
                    <tr key={incident.id} className="bg-white">
                      <td className="p-4 font-medium text-slate-900">{incident.id}</td>
                      <td className="p-4 text-slate-600">{incident.type}</td>
                      <td className="p-4 text-slate-600">{incident.city}</td>
                      <td className="p-4 text-slate-600">{incident.patients}</td>
                      <td className="p-4"><StatusBadge status={incident.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-slate-950 text-white shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold">تنبيهات تشغيلية</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-medium">بلاغ قيد الاستكمال</p>
                <p className="mt-1 text-sm text-white/60">بلاغ ضيق تنفس يحتاج إكمال العلامات الحيوية.</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-medium">مراجعة قائد الفريق</p>
                <p className="mt-1 text-sm text-white/60">4 بلاغات بانتظار الاعتماد النهائي.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NewIncident() {
  const [patientCount, setPatientCount] = useState(1);
  const patients = useMemo(() => Array.from({ length: patientCount }, (_, i) => i + 1), [patientCount]);

  return (
    <div className="space-y-6">
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">تسجيل بلاغ إسعافي جديد</h2>
              <p className="text-sm text-slate-500">أدخل أقل قدر ممكن من البيانات اللازمة للتوثيق والإحصاء.</p>
            </div>
            <StatusBadge status="قيد الاستكمال" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="رقم بلاغ الهلال إن وجد" placeholder="مثال: 997-12345" />
            <SelectField label="مصدر البلاغ" options={["الهلال الأحمر", "فعالية", "بلاغ مباشر", "أخرى"]} />
            <Field label="وقت البلاغ" type="time" />
            <Field label="وقت الوصول" type="time" />
            <SelectField label="نوع البلاغ" options={["حادث مروري", "إغماء", "ضيق تنفس", "ألم صدر", "نزيف", "سقوط", "حروق", "أخرى"]} />
            <Field label="المدينة" placeholder="الرياض" />
            <Field label="الحي" placeholder="مثال: العليا" />
            <Field label="الإحداثيات GPS" placeholder="24.7136, 46.6753" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <SelectField label="درجة البلاغ العامة" options={["بسيط", "متوسط", "حرج", "وفاة"]} />
            <Field label="عدد المصابين" type="number" placeholder="1" />
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">إضافة نماذج مصابين</span>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-2xl" onClick={() => setPatientCount(Math.max(1, patientCount - 1))}>-</Button>
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm">{patientCount}</div>
                <Button variant="outline" className="rounded-2xl" onClick={() => setPatientCount(patientCount + 1)}>+</Button>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {patients.map((patient) => (
        <Card key={patient} className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 font-bold text-red-700">{patient}</div>
              <div>
                <h3 className="font-bold text-slate-900">بيانات المصاب رقم {patient}</h3>
                <p className="text-xs text-slate-500">لا يتم إدخال الاسم أو رقم الهوية إلا عند الحاجة النظامية.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <SelectField label="الجنس" options={["غير محدد", "ذكر", "أنثى"]} />
              <Field label="العمر التقريبي" placeholder="مثال: 35" />
              <SelectField label="مستوى الوعي" options={["واعي", "يستجيب للصوت", "يستجيب للألم", "فاقد الوعي"]} />
              <SelectField label="تصنيف الحالة" options={["بسيط", "متوسط", "حرج", "وفاة"]} />
              <Field label="النبض" placeholder="نبضة/دقيقة" />
              <Field label="الضغط" placeholder="120/80" />
              <Field label="نسبة الأكسجين" placeholder="SpO2 %" />
              <Field label="السكر" placeholder="mg/dL" />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <SelectField label="الإسعافات المقدمة" options={["تقييم أولي", "أكسجين", "إيقاف نزيف", "تضميد", "تثبيت", "CPR", "قياس سكر", "أخرى"]} />
              <SelectField label="النقل أو التسليم" options={["لم ينقل", "نقل بواسطة الهلال الأحمر", "نقل خاص", "رفض النقل", "تسليم لجهة مختصة"]} />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="outline" className="rounded-2xl px-6">حفظ كمسودة</Button>
        <Button className="rounded-2xl bg-red-600 px-6 hover:bg-red-700">إرسال للمراجعة</Button>
      </div>
    </div>
  );
}

function Incidents() {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">سجل البلاغات</h2>
            <p className="text-sm text-slate-500">بحث ومراجعة واعتماد البلاغات المسجلة.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute right-4 top-3.5 text-slate-400" size={18} />
            <input className="w-full rounded-2xl border border-slate-200 bg-white py-3 pr-11 pl-4 text-sm outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50" placeholder="بحث برقم البلاغ أو النوع" />
          </div>
        </div>
        <div className="grid gap-4">
          {sampleIncidents.map((incident) => (
            <div key={incident.id} className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-5 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-red-50 p-3 text-red-600">
                  <FileText size={22} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{incident.id}</p>
                  <p className="mt-1 text-sm text-slate-500">{incident.type} — {incident.city} — {incident.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{incident.patients} مصاب</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{incident.severity}</span>
                <StatusBadge status={incident.status} />
                <Button variant="outline" className="rounded-2xl">فتح</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Reports() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card className="rounded-3xl border-0 shadow-sm xl:col-span-2">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-slate-900">تقارير وإحصائيات</h2>
          <p className="mt-1 text-sm text-slate-500">بيانات مجمعة بدون أسماء أو هويات.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <StatCard title="أكثر نوع بلاغ" value="حوادث" icon={Ambulance} hint="36% من بلاغات الشهر" />
            <StatCard title="الحالات الحرجة" value="11" icon={HeartPulse} hint="هذا الشهر" />
            <StatCard title="بلاغات الفعاليات" value="42" icon={Users} hint="آخر 30 يوم" />
            <StatCard title="رفض النقل" value="7" icon={FileText} hint="تحتاج مراجعة إجرائية" />
          </div>
        </CardContent>
      </Card>
      <Card className="rounded-3xl border-0 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-slate-900">الفلاتر</h2>
          <div className="mt-5 space-y-4">
            <Field label="من تاريخ" type="date" />
            <Field label="إلى تاريخ" type="date" />
            <SelectField label="المدينة" options={["الكل", "الرياض", "جدة", "الدمام", "الدرعية"]} />
            <SelectField label="نوع البلاغ" options={["الكل", "حادث مروري", "إغماء", "ضيق تنفس", "ألم صدر"]} />
            <Button className="w-full rounded-2xl bg-red-600 hover:bg-red-700">توليد التقرير</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <Card className="rounded-3xl border-0 shadow-sm">
      <CardContent className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
        <div className="mb-5 rounded-3xl bg-red-50 p-5 text-red-600">
          <Icon size={42} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function EmergencyResponderPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState("dashboard");

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const pages = {
    dashboard: <Dashboard setActive={setActive} />,
    new: <NewIncident />,
    incidents: <Incidents />,
    reports: <Reports />,
    users: <PlaceholderPage title="إدارة المستخدمين" description="إضافة المسعفين، ربطهم بالفرق، وتحديد الأدوار مثل مسعف، قائد فريق، مشرف عمليات، ومسؤول إحصائيات." icon={Users} />,
    settings: <PlaceholderPage title="الأمان والصلاحيات" description="إدارة التحقق الثنائي، سجل التدقيق، صلاحيات التصدير، وسياسة الاحتفاظ بالبيانات." icon={ShieldCheck} />,
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar active={active} setActive={setActive} />
        <main className="min-w-0 flex-1">
          <Header active={active} setActive={setActive} />
          <div className="p-5 lg:p-8">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {pages[active]}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
