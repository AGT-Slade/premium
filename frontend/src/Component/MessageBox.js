import Alert from 'react-bootstrap/Alert';

function MessageBox(props) {
    
    return (
        <Alert variant={props.variante || 'info'}>
            <div>{props.children}</div>
        </Alert>
        
    )
}

export default MessageBox;