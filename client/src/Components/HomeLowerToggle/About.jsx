const About=()=>{
    return (
        <div className="text-justify text-sm md:text-base leading-relaxed text-blue-800">
            <p className="mb-4">
                The <strong>NIT Raipur Dispensary</strong> is located at D-5 Quarter, opposite Nilgiri Apartment in the Faculty Housing Complex. 
                It comprises three dedicated rooms for doctors, a consulting hall, a pathology room, and a staff room to support efficient healthcare services.
            </p>
            
            <p className="mb-2 font-semibold">Medical Facilities Available:</p>
            <ul className="list-disc list-inside space-y-1">
                <li>Free OPD consultation for all NIT Raipur students and staff</li>
                <li>Free distribution of essential medicines</li>
                <li>24x7 ambulance service for emergency hospitalizations</li>
                <li>Medical Reimbursement (MR) claims for regular employees as per CGHS rates</li>
            </ul>

            <p className="mt-4 text-sm text-blue-700">
                For more details, visit the official website:{" "}
                <a
                href="https://nitrr.ac.in/index.php"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
                >
                https://nitrr.ac.in
                </a>
            </p>
        </div>

    )
}
export default About;