// ======================================================
// MedPortal NITRR Demo Seed Data
// ======================================================

// ---------------- Students ----------------

const students = [
{
    name: "Rahul Verma",
    email: "rahul22116041@nitrr.ac.in",
    password: "Student@123",
    roll: "22116041",
    role: "Student",
    age: "21",
    bloodGroup: "B+",
    mobileNo: "9876543201",
    fatherName: "Ramesh Verma",
    fatherMobile: "9876500001",
    address: "Hostel A, NIT Raipur",
    previous_health: ""
},
{
    name: "Ananya Sharma",
    email: "ananya22116042@nitrr.ac.in",
    password: "Student@123",
    roll: "22116042",
    role: "Student",
    age: "20",
    bloodGroup: "O+",
    mobileNo: "9876543202",
    fatherName: "Rajesh Sharma",
    fatherMobile: "9876500002",
    address: "Hostel B, NIT Raipur",
    previous_health: "Migraine"
},
{
    name: "Aditya Patel",
    email: "aditya22116043@nitrr.ac.in",
    password: "Student@123",
    roll: "22116043",
    role: "Student",
    age: "21",
    bloodGroup: "A+",
    mobileNo: "9876543203",
    fatherName: "Mahesh Patel",
    fatherMobile: "9876500003",
    address: "Hostel C, NIT Raipur",
    previous_health: ""
},
{
    name: "Priya Singh",
    email: "priya22116044@nitrr.ac.in",
    password: "Student@123",
    roll: "22116044",
    role: "Student",
    age: "20",
    bloodGroup: "AB+",
    mobileNo: "9876543204",
    fatherName: "Ajay Singh",
    fatherMobile: "9876500004",
    address: "Hostel D, NIT Raipur",
    previous_health: ""
},
{
    name: "Kunal Mishra",
    email: "kunal22116045@nitrr.ac.in",
    password: "Student@123",
    roll: "22116045",
    role: "Student",
    age: "21",
    bloodGroup: "O-",
    mobileNo: "9876543205",
    fatherName: "Rakesh Mishra",
    fatherMobile: "9876500005",
    address: "Hostel E, NIT Raipur",
    previous_health: "Asthma"
},
{
    name: "Sneha Gupta",
    email: "sneha22116046@nitrr.ac.in",
    password: "Student@123",
    roll: "22116046",
    role: "Student",
    age: "20",
    bloodGroup: "A-",
    mobileNo: "9876543206",
    fatherName: "Vijay Gupta",
    fatherMobile: "9876500006",
    address: "Girls Hostel",
    previous_health: ""
},
{
    name: "Arjun Nair",
    email: "arjun22116047@nitrr.ac.in",
    password: "Student@123",
    roll: "22116047",
    role: "Student",
    age: "22",
    bloodGroup: "B-",
    mobileNo: "9876543207",
    fatherName: "Suresh Nair",
    fatherMobile: "9876500007",
    address: "Hostel F",
    previous_health: ""
},
{
    name: "Ishita Roy",
    email: "ishita22116048@nitrr.ac.in",
    password: "Student@123",
    roll: "22116048",
    role: "Student",
    age: "21",
    bloodGroup: "AB-",
    mobileNo: "9876543208",
    fatherName: "Subhash Roy",
    fatherMobile: "9876500008",
    address: "Girls Hostel",
    previous_health: "Low BP"
}
];


// ---------------- Medicines ----------------

const medicines = [
{name:"Paracetamol 500 mg",quantity:250,usage:"Fever & Pain"},
{name:"Dolo 650",quantity:180,usage:"Fever"},
{name:"Crocin Advance",quantity:160,usage:"Pain Relief"},
{name:"Cetirizine",quantity:150,usage:"Allergy"},
{name:"Levocetirizine",quantity:120,usage:"Allergy"},
{name:"ORS Sachet",quantity:220,usage:"Dehydration"},
{name:"Pantoprazole",quantity:120,usage:"Acidity"},
{name:"Omeprazole",quantity:100,usage:"Acidity"},
{name:"Digene",quantity:110,usage:"Gas & Acidity"},
{name:"Rantac",quantity:90,usage:"Acidity"},
{name:"Ibuprofen",quantity:140,usage:"Pain Relief"},
{name:"Aceclofenac",quantity:100,usage:"Joint Pain"},
{name:"Amoxicillin",quantity:90,usage:"Bacterial Infection"},
{name:"Azithromycin",quantity:80,usage:"Bacterial Infection"},
{name:"Metronidazole",quantity:70,usage:"Infection"},
{name:"Vitamin C",quantity:180,usage:"Immunity"},
{name:"Vitamin D3",quantity:120,usage:"Bone Health"},
{name:"Calcium Tablets",quantity:150,usage:"Bone Strength"},
{name:"Iron Tablets",quantity:120,usage:"Iron Deficiency"},
{name:"Zinc Tablets",quantity:100,usage:"Immunity"},
{name:"B-Complex Capsules",quantity:120,usage:"Vitamin Supplement"},
{name:"Multivitamin Tablets",quantity:140,usage:"General Health"},
{name:"Folic Acid",quantity:90,usage:"Supplement"},
{name:"Ondansetron",quantity:70,usage:"Vomiting"},
{name:"Domperidone",quantity:80,usage:"Nausea"},
{name:"Loperamide",quantity:60,usage:"Loose Motion"},
{name:"Cough Syrup",quantity:65,usage:"Cough"},
{name:"Benadryl Syrup",quantity:50,usage:"Dry Cough"},
{name:"Ascoril Syrup",quantity:55,usage:"Wet Cough"},
{name:"Betadine Solution",quantity:75,usage:"Wound Cleaning"},
{name:"Savlon",quantity:60,usage:"Antiseptic"},
{name:"Dettol",quantity:80,usage:"Disinfectant"},
{name:"Burnol Cream",quantity:50,usage:"Burn Treatment"},
{name:"Soframycin",quantity:45,usage:"Skin Infection"},
{name:"Clotrimazole Cream",quantity:40,usage:"Fungal Infection"},
{name:"Calamine Lotion",quantity:55,usage:"Skin Allergy"},
{name:"Bandage Roll",quantity:150,usage:"Dressing"},
{name:"Crepe Bandage",quantity:70,usage:"Sprain"},
{name:"Cotton Roll",quantity:200,usage:"First Aid"},
{name:"Sterile Gauze",quantity:220,usage:"Dressing"},
{name:"Micropore Tape",quantity:100,usage:"Bandaging"},
{name:"Surgical Gloves",quantity:400,usage:"Protection"},
{name:"Face Mask",quantity:500,usage:"Protection"},
{name:"Hand Sanitizer",quantity:150,usage:"Hand Hygiene"},
{name:"Digital Thermometer",quantity:25,usage:"Temperature Check"},
{name:"BP Monitor Battery",quantity:20,usage:"Medical Equipment"},
{name:"Glucon-D",quantity:100,usage:"Energy"},
{name:"Electral Powder",quantity:100,usage:"Electrolyte"},
{name:"Pain Relief Spray",quantity:40,usage:"Muscle Pain"},
{name:"Hot Water Bag",quantity:20,usage:"Pain Relief"},
{name:"Ice Pack",quantity:25,usage:"Swelling"},
{name:"Diclofenac Gel",quantity:40,usage:"Muscle Pain"},
{name:"Eye Drops",quantity:35,usage:"Eye Irritation"},
{name:"Nasal Spray",quantity:30,usage:"Nasal Congestion"},
{name:"Hydrogen Peroxide",quantity:30,usage:"Cleaning Wounds"},
{name:"Antiseptic Wipes",quantity:150,usage:"Cleaning"},
{name:"ORS Bottle",quantity:40,usage:"Hydration"},
{name:"Medical Scissors",quantity:15,usage:"First Aid"},
{name:"Elastic Tape",quantity:50,usage:"Sports Injury"},
{name:"Instant Cold Pack",quantity:30,usage:"Swelling"}
];


// ======================= Facilities =======================

const facilities = [
{
    title:"OPD Consultation",
    description:"Free consultation by the Medical Officer during working hours."
},
{
    title:"Medicine Distribution",
    description:"Essential medicines are provided free to students."
},
{
    title:"First Aid",
    description:"Immediate first aid for minor injuries and emergencies."
},
{
    title:"Blood Pressure Check",
    description:"Routine BP monitoring facility."
},
{
    title:"Blood Sugar Test",
    description:"Random blood sugar testing."
},
{
    title:"Medical Certificate",
    description:"Medical fitness and leave certificates."
},
{
    title:"Emergency Ambulance",
    description:"Ambulance support for emergency referrals."
},
{
    title:"Pathology Sample Collection",
    description:"Basic pathology sample collection facility."
}];


// ======================= Nearby Hospitals =======================

const hospitals = [
{
    name:"AIIMS Raipur",
    address:"Tatibandh, Raipur",
    phone:"07712575555"
},
{
    name:"Dr. B.R. Ambedkar Memorial Hospital",
    address:"GE Road, Raipur",
    phone:"07712520000"
},
{
    name:"Ramkrishna CARE Hospitals",
    address:"Pachpedi Naka, Raipur",
    phone:"07713000000"
},
{
    name:"MMI Narayana Multispeciality Hospital",
    address:"Dhamtari Road, Raipur",
    phone:"07714220000"
},
{
    name:"Balco Medical Centre",
    address:"Naya Raipur",
    phone:"07713500000"
},
{
    name:"Shri Balaji Super Speciality Hospital",
    address:"Raipur",
    phone:"07714440000"
},
{
    name:"Life Worth Hospital",
    address:"Samta Colony, Raipur",
    phone:"07714000000"
},
{
    name:"Arihant Hospital",
    address:"Civil Lines, Raipur",
    phone:"07714111111"
}
];


// ======================= Notifications =======================

const notifications = [
"Blood Donation Camp on 20th July",
"Free General Health Check-up Camp",
"Eye Check-up Camp for Students",
"Yoga and Wellness Session",
"Mental Health Awareness Week",
"Hostel Medical Awareness Program",
"COVID-19 Booster Vaccination Drive",
"Dispensary Closed on Independence Day",
"New Medicine Stock Available",
"Emergency Contact Numbers Updated"
];


// ======================= Gallery =======================

const gallery = [
{
    title:"NIT Raipur Dispensary",
    imageUrl:"https://picsum.photos/600/400?random=11"
},
{
    title:"Health Camp",
    imageUrl:"https://picsum.photos/600/400?random=12"
},
{
    title:"Medicine Counter",
    imageUrl:"https://picsum.photos/600/400?random=13"
},
{
    title:"Blood Donation Camp",
    imageUrl:"https://picsum.photos/600/400?random=14"
},
{
    title:"First Aid Room",
    imageUrl:"https://picsum.photos/600/400?random=15"
},
{
    title:"Ambulance Service",
    imageUrl:"https://picsum.photos/600/400?random=16"
}
];

module.exports = {
    students,
    medicines,
    facilities,
    hospitals,
    notifications,
    gallery
};