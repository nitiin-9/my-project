import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
    console.log("close clicked");
    const content = ( <
        div className = { `modal ${props.className}` }
        style = { props.style } >
        <
        header className = { `modal__header ${props.headerClass}` } >
        <
        h2 > { props.header } < /h2>{" "} <
        /header>{" "} <
        form onSubmit = {
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        } >
        <
        div className = { `modal__content ${props.contentClass}` } > { " " } { props.children } { " " } <
        /div>{" "} <
        footer className = { `modal__footer ${props.footerClass}` } > { " " } { props.footer } { " " } <
        /footer>{" "} <
        /form>{" "} <
        /div>
    );
    return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
        console.log('modal props', props);
        return ( <
            React.Fragment > {
                props.show && ( <
                    Backdrop onClick = { props.onCancel }
                    style = {
                        { border: "4px red solid  " } }
                    />
                )
            } {
                props.show && < ModalOverlay {...props }
                />} <
                /React.Fragment>
            );
        };

        export default Modal;