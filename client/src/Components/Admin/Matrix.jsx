import { Link } from "react-router-dom";
const Matrix = ({ data }) => {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {data.map((elt, idx) => (
                <Link to={elt.link} key={idx}>
                    <div
                        className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50"
                    >
                        <span className="text-3xl text-blue-600">{elt.icon}</span>
                        <p className="text-sm font-medium text-gray-700 text-center">{elt.title}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Matrix; 
