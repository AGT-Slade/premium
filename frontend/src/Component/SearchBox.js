import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";


function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');


const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : `/search`);
    }
    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup>
                <FormControl 
                    type="text" 
                    name="q"
                    id="q" 
                    onChange={(e) => setQuery(e.target.value)} 
                    aria-label="Search Products..."
                    aria-describedby="button-search"
                    className="mr-sm-2">
                </FormControl>
                <Button id="button-search" type="submit" variant="outline-primary">
                    <i className="fas fa-search"></i>
                    </Button>
            </InputGroup>

        </Form>
    )
}

export default SearchBox;