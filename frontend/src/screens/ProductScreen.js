import { useParams } from "react-router-dom";


function ProductScreen() {
    const params = useParams();
    const {slug} = params;
    return(
        <div>
            <h1 style={{color: "red", textAlign: "center", backgroundColor: "powderblue"}}>{slug}</h1>
        </div>
    );
}

export default ProductScreen;