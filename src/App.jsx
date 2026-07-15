import { useEffect, useMemo, useState } from 'react'

const HOTLINE = '01712839990'
const MAP_URL = 'https://maps.app.goo.gl/zE8xQNJQC1UEsmGC9?g_st=aw'
const asset = path => `${import.meta.env.BASE_URL}${path}`

const copy = {
  en: {
    language: 'বাংলা', nav: ['Services', 'Doctors', 'Packages', 'About'], appointment: 'Book appointment', portal: 'Patient portal',
    open: 'Open 24 hours · 7 days a week', heroA: 'Specialist care,', heroB: 'made human.', heroP: 'Experienced doctors, thoughtful care and modern diagnostics—together, under one roof.',
    findDoctor: 'Find a doctor', call: 'National emergency: 999', trusted: 'Trusted by families across the community', years: 'years of care', specialists: 'specialist doctors', support: 'emergency support',
    quickTitle: 'How can we help today?', quickP: 'Start with what you need. We’ll guide you from there.',
    services: [
      ['Find a doctor', 'Search by name or specialty', 'user'], ['Book an appointment', 'Choose a convenient time', 'calendar'], ['Patient portal', 'Reports, records & follow-ups', 'folder'], ['Emergency care', 'Immediate help, day or night', 'pulse']
    ],
    careEyebrow: 'Care for every stage of life', careTitle: 'Specialized services, centered around you.', careP: 'From prevention and diagnosis to treatment and recovery, our clinical teams work together for clearer answers and better outcomes.',
    departments: [['Cardiology', 'Advanced heart care'], ['Obstetrics & Gynaecology', 'Compassionate women’s care'], ['Paediatrics', 'Specialist care for children'], ['Medicine', 'Complete adult medical care'], ['Orthopaedics', 'Movement, injury & joint care'], ['Diagnostics', 'Reliable tests, faster answers']], explore: 'Explore all services',
    doctorsEyebrow: 'Meet our specialists', doctorsTitle: 'Experienced hands. Reassuring hearts.', doctorsP: 'Search our specialist team and find the right doctor for your needs.', search: 'Search doctor or specialty', available: 'Available today', next: 'Next: Tomorrow', view: 'View profile', book: 'Book now', noDoctors: 'No matching doctor found.',
    packageEyebrow: 'Preventive health', packageTitle: 'Know more. Worry less.', packageP: 'Thoughtfully designed health checks for every age and stage—clear, convenient, and clinically reviewed.', packageButton: 'View health packages', starts: 'Packages start from', currency: '৳1,500', reports: 'Digital reports', tests: 'Essential tests', review: 'Doctor review',
    whyEyebrow: 'Why Bright Health', whyTitle: 'Care you can feel confident about.', whyP: 'We combine experienced specialists, attentive teams and dependable technology to make each visit calmer and more informed.',
    reasons: [['Specialist-led care', 'Your care plan is guided by experienced clinical teams.'], ['Clear communication', 'We explain your options so you can decide with confidence.'], ['Modern diagnostics', 'Reliable technology helps deliver timely, accurate answers.']],
    locationEyebrow: 'Visit us', locationTitle: 'Quality care, close to home.', address: 'Bright Health Specialized Hospital\nBangladesh', directions: 'Open map', contact: 'Book a callback', always: '24/7 Emergency', alwaysP: 'For a life-threatening emergency, call the national emergency service.', emergencyCall: 'Call 999',
    footerP: 'Specialist care with skill, clarity and compassion.', footerHeadings: ['Hospital', 'Patient care'], hospitalLinks: ['About us', 'Our doctors', 'Services', 'Contact'], patientLinks: ['Appointments', 'Health packages', 'Patient portal', 'Emergency'], copyright: '© 2026 Bright Health Specialized Hospital. All rights reserved.',
    modalTitle: 'Book an appointment', modalP: 'Leave your details and our care team will call to confirm your appointment.', name: 'Patient name', phone: 'Mobile number', specialty: 'Choose specialty', submit: 'Request appointment', sent: 'Request received. We’ll call you shortly.', close: 'Close'
  },
  bn: {
    language: 'ENG', nav: ['সেবাসমূহ', 'ডাক্তার', 'হেলথ প্যাকেজ', 'আমাদের সম্পর্কে'], appointment: 'অ্যাপয়েন্টমেন্ট নিন', portal: 'পেশেন্ট পোর্টাল',
    open: 'সপ্তাহের ৭ দিন · ২৪ ঘণ্টা খোলা', heroA: 'বিশেষজ্ঞ সেবা,', heroB: 'আন্তরিক যত্ন।', heroP: 'অভিজ্ঞ ডাক্তার, আন্তরিক সেবা ও আধুনিক ডায়াগনস্টিক—সবকিছু একই ছাদের নিচে।',
    findDoctor: 'ডাক্তার খুঁজুন', call: 'জাতীয় জরুরি সেবা: ৯৯৯', trusted: 'এই অঞ্চলের অসংখ্য পরিবারের বিশ্বস্ত স্বাস্থ্যসেবা', years: 'বছরের সেবা', specialists: 'বিশেষজ্ঞ ডাক্তার', support: 'জরুরি সেবা',
    quickTitle: 'আজ কীভাবে সাহায্য করতে পারি?', quickP: 'আপনার প্রয়োজন দিয়ে শুরু করুন। পরের ধাপে আমরা পাশে আছি।',
    services: [['ডাক্তার খুঁজুন', 'নাম বা বিভাগ দিয়ে খুঁজুন', 'user'], ['অ্যাপয়েন্টমেন্ট নিন', 'সুবিধাজনক সময় বেছে নিন', 'calendar'], ['পেশেন্ট পোর্টাল', 'রিপোর্ট, রেকর্ড ও ফলো-আপ', 'folder'], ['জরুরি সেবা', 'দিন-রাত তাৎক্ষণিক সহায়তা', 'pulse']],
    careEyebrow: 'জীবনের প্রতিটি পর্যায়ের যত্ন', careTitle: 'আপনাকে ঘিরেই বিশেষায়িত সেবা।', careP: 'প্রতিরোধ ও রোগ নির্ণয় থেকে চিকিৎসা ও সুস্থতা—স্পষ্ট উত্তর ও উন্নত ফলাফলের জন্য আমাদের চিকিৎসক দল একসাথে কাজ করে।',
    departments: [['হৃদরোগ', 'উন্নত হৃদরোগ চিকিৎসা'], ['প্রসূতি ও স্ত্রীরোগ', 'নারীর জন্য আন্তরিক সেবা'], ['শিশু বিভাগ', 'শিশুদের বিশেষায়িত যত্ন'], ['মেডিসিন', 'প্রাপ্তবয়স্কদের পূর্ণাঙ্গ চিকিৎসা'], ['অর্থোপেডিকস', 'হাড়, জয়েন্ট ও আঘাতের চিকিৎসা'], ['ডায়াগনস্টিকস', 'নির্ভরযোগ্য পরীক্ষা, দ্রুত ফলাফল']], explore: 'সব সেবা দেখুন',
    doctorsEyebrow: 'আমাদের বিশেষজ্ঞগণ', doctorsTitle: 'অভিজ্ঞ হাত। আশ্বস্ত হৃদয়।', doctorsP: 'আপনার প্রয়োজন অনুযায়ী সঠিক বিশেষজ্ঞ ডাক্তার খুঁজে নিন।', search: 'ডাক্তার বা বিভাগ খুঁজুন', available: 'আজ পাওয়া যাবে', next: 'পরবর্তী: আগামীকাল', view: 'প্রোফাইল দেখুন', book: 'বুক করুন', noDoctors: 'কোনো ডাক্তার পাওয়া যায়নি।',
    packageEyebrow: 'প্রতিরোধমূলক স্বাস্থ্যসেবা', packageTitle: 'আরও জানুন। দুশ্চিন্তা কমান।', packageP: 'সব বয়সের জন্য পরিকল্পিত স্বাস্থ্য পরীক্ষা—সহজ, সুবিধাজনক এবং চিকিৎসক কর্তৃক পর্যালোচিত।', packageButton: 'হেলথ প্যাকেজ দেখুন', starts: 'প্যাকেজ শুরু', currency: '৳১,৫০০', reports: 'ডিজিটাল রিপোর্ট', tests: 'প্রয়োজনীয় পরীক্ষা', review: 'ডাক্তারের পরামর্শ',
    whyEyebrow: 'কেন ব্রাইট হেলথ', whyTitle: 'যে সেবায় নিশ্চিন্ত থাকা যায়।', whyP: 'আপনার প্রতিটি ভিজিটকে স্বস্তিদায়ক ও ফলপ্রসূ করতে অভিজ্ঞ বিশেষজ্ঞ, আন্তরিক টিম ও নির্ভরযোগ্য প্রযুক্তি একসাথে কাজ করে।',
    reasons: [['বিশেষজ্ঞ-নেতৃত্বাধীন সেবা', 'অভিজ্ঞ চিকিৎসক দল আপনার চিকিৎসা পরিকল্পনা করেন।'], ['স্পষ্ট যোগাযোগ', 'সিদ্ধান্ত নিতে আমরা প্রতিটি বিকল্প সহজভাবে বুঝিয়ে দিই।'], ['আধুনিক ডায়াগনস্টিক', 'নির্ভরযোগ্য প্রযুক্তিতে দ্রুত ও নির্ভুল ফলাফল।']],
    locationEyebrow: 'আমাদের ঠিকানা', locationTitle: 'মানসম্মত সেবা, আপনার কাছেই।', address: 'ব্রাইট হেলথ স্পেশালাইজড হাসপাতাল\nবাংলাদেশ', directions: 'ম্যাপ দেখুন', contact: 'কলব্যাক বুক করুন', always: '২৪/৭ জরুরি সেবা', alwaysP: 'জীবন-হুমকির জরুরি পরিস্থিতিতে জাতীয় জরুরি সেবায় কল করুন।', emergencyCall: '৯৯৯-এ কল করুন',
    footerP: 'দক্ষতা, স্বচ্ছতা ও আন্তরিকতার সাথে বিশেষজ্ঞ সেবা।', footerHeadings: ['হাসপাতাল', 'পেশেন্ট সেবা'], hospitalLinks: ['আমাদের সম্পর্কে', 'ডাক্তারগণ', 'সেবাসমূহ', 'যোগাযোগ'], patientLinks: ['অ্যাপয়েন্টমেন্ট', 'হেলথ প্যাকেজ', 'পেশেন্ট পোর্টাল', 'জরুরি সেবা'], copyright: '© ২০২৬ ব্রাইট হেলথ স্পেশালাইজড হাসপাতাল। সর্বস্বত্ব সংরক্ষিত।',
    modalTitle: 'অ্যাপয়েন্টমেন্ট নিন', modalP: 'আপনার তথ্য দিন, আমাদের টিম ফোন করে সময় নিশ্চিত করবে।', name: 'রোগীর নাম', phone: 'মোবাইল নম্বর', specialty: 'বিভাগ বেছে নিন', submit: 'অ্যাপয়েন্টমেন্ট অনুরোধ', sent: 'অনুরোধ পেয়েছি। শীঘ্রই আপনাকে কল করা হবে।', close: 'বন্ধ করুন'
  }
}

const doctors = [
  { initials: 'MR', name: { en: 'Dr. Mahmudur Rahman', bn: 'ডা. মাহমুদুর রহমান' }, role: { en: 'Consultant, Internal Medicine', bn: 'কনসালট্যান্ট, মেডিসিন' }, exp: 'MBBS, FCPS (Medicine)', time: 'available' },
  { initials: 'SA', name: { en: 'Dr. Sadia Afrin', bn: 'ডা. সাদিয়া আফরিন' }, role: { en: 'Consultant, Obstetrics & Gynaecology', bn: 'কনসালট্যান্ট, প্রসূতি ও স্ত্রীরোগ' }, exp: 'MBBS, FCPS (Gynae & Obs)', time: 'next' },
  { initials: 'NH', name: { en: 'Dr. Nazmul Haque', bn: 'ডা. নাজমুল হক' }, role: { en: 'Consultant, Paediatrics', bn: 'কনসালট্যান্ট, শিশু বিভাগ' }, exp: 'MBBS, DCH, FCPS', time: 'available' }
]

const icons = {
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18m-9 4v4m-2-2h4"/></>,
  folder: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M8 13h8m-4-3v6"/></>,
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6"/>,
  phone: <path d="M21 16.8v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.2 19.2 0 0 1-6-6 19.7 19.7 0 0 1-3.1-8.6A2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.9.7 2.8a2 2 0 0 1-.5 2.1L7 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.8.7a2 2 0 0 1 1.8 2Z"/>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  close: <path d="m6 6 12 12M18 6 6 18"/>
}

function Icon({ name, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const [sent, setSent] = useState(false)
  const [query, setQuery] = useState('')
  const t = copy[lang]
  const filteredDoctors = useMemo(() => doctors.filter(d => `${d.name[lang]} ${d.role[lang]}`.toLowerCase().includes(query.toLowerCase())), [query, lang])

  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en'
    document.body.classList.toggle('modal-open', modal)
    return () => document.body.classList.remove('modal-open')
  }, [lang, modal])

  const openBooking = () => { setSent(false); setModal(true); setMenu(false) }
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }
  const footerHospitalTargets = ['about', 'doctors', 'services', 'contact']
  const footerPatientActions = [openBooking, () => scrollTo('packages'), () => scrollTo('app'), () => scrollTo('contact')]

  return <div className="site-shell">
    <header className="header">
      <a className="brand" href="#home" aria-label="Bright Health home"><img src={asset("bright-health-logo.png")} alt="Bright Health logo"/><span><strong>BRIGHT HEALTH</strong><small>SPECIALIZED HOSPITAL</small></span></a>
      <nav className={menu ? 'nav open' : 'nav'} aria-label="Main navigation">
        {['services', 'doctors', 'packages', 'about'].map((id, i) => <button key={id} onClick={() => scrollTo(id)}>{t.nav[i]}</button>)}
        <button className="portal-mobile">{t.portal}</button>
        <button className="nav-book" onClick={openBooking}>{t.appointment}</button>
      </nav>
      <div className="header-actions"><button className="language" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} aria-label="Change language">{t.language}</button><button className="portal">{t.portal}</button><button className="book-small" onClick={openBooking}>{t.appointment}<Icon name="arrow" size={17}/></button><button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Icon name={menu ? 'close' : 'menu'}/></button></div>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy reveal">
          <span className="eyebrow"><i />{t.open}</span>
          <h1>{t.heroA}<br/><em>{t.heroB}</em></h1>
          <p>{t.heroP}</p>
          <div className="hero-actions"><button className="button primary" onClick={() => scrollTo('doctors')}>{t.findDoctor}<Icon name="arrow" size={18}/></button><button className="button secondary" onClick={openBooking}><Icon name="calendar" size={18}/>{t.appointment}</button></div>
          <div className="trust-note"><span className="avatar-stack"><b>MR</b><b>SA</b><b>NH</b></span><span><strong>4.9</strong><span className="stars">★★★★★</span><small>{t.trusted}</small></span></div>
        </div>
        <div className="hero-visual reveal">
          <div className="hero-image"><img src={asset("hospital-building.jpg")} alt="Bright Health Specialized Hospital building" fetchPriority="high"/><span className="image-shade"/></div>
          <div className="emergency-card"><span className="pulse-icon"><Icon name="pulse"/></span><span><small>{t.always}</small><strong>{lang === 'en' ? 'National service · 999' : 'জাতীয় সেবা · ৯৯৯'}</strong></span></div>
          <div className="care-badge"><span>BH</span><p><strong>{lang === 'en' ? 'Care, close by.' : 'সেবা, একদম কাছে।'}</strong><small>{lang === 'en' ? 'Bright Health Hospital' : 'ব্রাইট হেলথ হাসপাতাল'}</small></p></div>
        </div>
      </section>

      <section className="stats" aria-label="Hospital statistics"><div><strong>12+</strong><span>{t.years}</span></div><div><strong>35+</strong><span>{t.specialists}</span></div><div><strong>24/7</strong><span>{t.support}</span></div></section>

      <section className="quick section-pad" id="services">
        <div className="section-intro centered"><h2>{t.quickTitle}</h2><p>{t.quickP}</p></div>
        <div className="quick-grid">{t.services.map(([title, sub, icon], index) => <button className={`quick-card q${index}`} key={title} onClick={() => index === 0 ? scrollTo('doctors') : index === 1 ? openBooking() : null}><span className="quick-icon"><Icon name={icon}/></span><span><strong>{title}</strong><small>{sub}</small></span><Icon name="arrow" size={19}/></button>)}</div>
      </section>

      <section className="care section-pad">
        <div className="section-intro"><span className="kicker">{t.careEyebrow}</span><h2>{t.careTitle}</h2><p>{t.careP}</p></div>
        <div className="department-grid">{t.departments.map(([title, sub], index) => <article className="department" key={title}><span className={`dept-symbol d${index}`}>{['♥','✦','☀','＋','⌁','◉'][index]}</span><div><h3>{title}</h3><p>{sub}</p></div><Icon name="arrow" size={18}/></article>)}</div>
        <button className="text-link">{t.explore}<Icon name="arrow" size={18}/></button>
      </section>

      <section className="doctor-section section-pad" id="doctors">
        <div className="doctor-heading"><div className="section-intro"><span className="kicker">{t.doctorsEyebrow}</span><h2>{t.doctorsTitle}</h2><p>{t.doctorsP}</p></div><label className="search"><Icon name="search" size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/></label></div>
        <div className="doctor-grid">{filteredDoctors.map((doctor, index) => <article className="doctor-card" key={doctor.initials}>
          <div className={`doctor-photo portrait-${index}`}><span>{doctor.initials}</span><b className={doctor.time === 'available' ? 'online' : ''}>{doctor.time === 'available' ? t.available : t.next}</b></div>
          <div className="doctor-body"><h3>{doctor.name[lang]}</h3><p>{doctor.role[lang]}</p><small>{doctor.exp}</small><div><button className="profile-button">{t.view}</button><button className="doctor-book" onClick={openBooking}>{t.book}<Icon name="arrow" size={16}/></button></div></div>
        </article>)}{!filteredDoctors.length && <p className="no-results">{t.noDoctors}</p>}</div>
      </section>

      <section className="package-section section-pad" id="packages">
        <div className="package-panel">
          <div className="package-copy"><span className="kicker light">{t.packageEyebrow}</span><h2>{t.packageTitle}</h2><p>{t.packageP}</p><div className="package-features">{[t.tests, t.reports, t.review].map(item => <span key={item}><i><Icon name="check" size={15}/></i>{item}</span>)}</div><button className="button yellow">{t.packageButton}<Icon name="arrow" size={18}/></button></div>
          <div className="package-art"><div className="package-card"><span><Icon name="check" size={24}/></span><small>{t.starts}</small><strong>{t.currency}</strong><p>{lang === 'en' ? 'Essential Health Check' : 'এসেনশিয়াল হেলথ চেক'}</p></div></div>
        </div>
      </section>

      <section className="app-section section-pad" id="app">
        <div className="app-copy">
          <span className="app-pill"><i />{lang === 'en' ? 'Bright Health mobile app' : 'ব্রাইট হেলথ মোবাইল অ্যাপ'}</span>
          <h2>{lang === 'en' ? 'Hospital care, closer than ever.' : 'হাসপাতালের সেবা, আরও কাছে।'}</h2>
          <p>{lang === 'en' ? 'Book appointments, check reports, explore health packages and stay connected with Bright Health from your phone.' : 'ফোন থেকেই অ্যাপয়েন্টমেন্ট বুকিং, রিপোর্ট দেখা, হেলথ প্যাকেজ ও ব্রাইট হেলথের সাথে দ্রুত যোগাযোগ করুন।'}</p>
          <div className="store-buttons">
            <button aria-label="Download on the App Store"><img src={asset("app-store-badge.png")} alt="Download on the App Store"/></button>
            <button aria-label="Get it on Google Play"><img src={asset("google-play-badge.png")} alt="Get it on Google Play"/></button>
          </div>
        </div>
        <div className="app-visual">
          <img src={asset("app-phones.png")} alt="Bright Health app preview" loading="lazy"/>
        </div>
      </section>

      <section className="why section-pad" id="about">
        <div className="why-visual"><img src={asset("hospital-building.jpg")} alt="Hospital entrance" loading="lazy"/><div className="quote-card"><span>“</span><p>{lang === 'en' ? 'Every patient deserves to feel heard, informed and cared for.' : 'প্রতিটি রোগীর কথা মন দিয়ে শোনা, বোঝানো ও যত্ন পাওয়ার অধিকার আছে।'}</p></div></div>
        <div className="why-copy section-intro"><span className="kicker">{t.whyEyebrow}</span><h2>{t.whyTitle}</h2><p>{t.whyP}</p><div className="reason-list">{t.reasons.map(([title, sub], i) => <article key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{sub}</p></div></article>)}</div></div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-heading"><span className="kicker light">Contact</span><h2>Get in <em>Touch</em></h2></div>
        <div className="contact-layout">
          <div className="contact-info">
            <a href={`tel:${HOTLINE}`}><Icon name="phone" size={21}/><span>{HOTLINE} <small>{lang === 'en' ? 'Hotline' : 'হটলাইন'}</small></span></a>
            <a href={MAP_URL} target="_blank" rel="noreferrer"><Icon name="pin" size={21}/><span>{t.address}</span></a>
            <div className="contact-map-card">
              <div className="mini-map" aria-hidden="true"><span className="map-road main"/><span className="map-road cross"/><span className="map-dot"><Icon name="pin" size={18}/></span></div>
              <div>
                <strong>{lang === 'en' ? 'Find us on Google Map' : 'গুগল ম্যাপে দেখুন'}</strong>
                <p>{t.address}</p>
                <a href={MAP_URL} target="_blank" rel="noreferrer">{t.directions}<Icon name="arrow" size={16}/></a>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <input placeholder={t.name} />
            <input type="tel" inputMode="tel" placeholder={t.phone} />
            <textarea placeholder={lang === 'en' ? 'Message' : 'মেসেজ'} />
            <button className="button yellow" type="submit">{lang === 'en' ? 'Submit' : 'সাবমিট'}</button>
          </form>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="footer-main"><div className="footer-brand"><a className="brand inverted" href="#home"><img src={asset("bright-health-logo.png")} alt=""/><span><strong>BRIGHT HEALTH</strong><small>SPECIALIZED HOSPITAL</small></span></a><p>{t.footerP}</p><a href={`tel:${HOTLINE}`}>{HOTLINE}</a></div><div><h3>{t.footerHeadings[0]}</h3>{t.hospitalLinks.map((x, i) => <button key={x} onClick={() => scrollTo(footerHospitalTargets[i])}>{x}</button>)}</div><div><h3>{t.footerHeadings[1]}</h3>{t.patientLinks.map((x, i) => <button key={x} onClick={footerPatientActions[i]}>{x}</button>)}</div><div className="footer-cta"><h3>{t.always}</h3><p>{t.alwaysP}</p><a href={`tel:${HOTLINE}`}><Icon name="phone" size={17}/>{HOTLINE}</a></div></div><div className="footer-bottom"><span>{t.copyright}</span><button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}>{t.language}</button></div></footer>

    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && setModal(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setModal(false)} aria-label={t.close}><Icon name="close"/></button>{sent ? <div className="success"><span><Icon name="check" size={34}/></span><h2>{t.sent}</h2><button className="button primary" onClick={() => setModal(false)}>{t.close}</button></div> : <><span className="kicker">{t.appointment}</span><h2 id="booking-title">{t.modalTitle}</h2><p>{t.modalP}</p><form onSubmit={e => { e.preventDefault(); setSent(true) }}><label>{t.name}<input required autoFocus /></label><label>{t.phone}<input required type="tel" inputMode="tel"/></label><label>{t.specialty}<select required defaultValue=""><option value="" disabled>—</option>{t.departments.slice(0,5).map(([x]) => <option key={x}>{x}</option>)}</select></label><button className="button primary" type="submit">{t.submit}<Icon name="arrow" size={18}/></button></form></>}</div></div>}
    <a className="mobile-emergency" href={`tel:${HOTLINE}`}><Icon name="phone" size={18}/>{HOTLINE}</a>
  </div>
}
