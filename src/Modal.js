import React from 'react'


export const modalContext = React.createContext({ open: true, show: () => { }, close: () => { } })


export class Modal extends React.Component {
    state = {
        open: false
    }
    show = () => {
        this.setState({ open: true })
    }

    close = () => {
        this.setState({ open: false })
    }

    render() {
        const values = {
            open: this.state.open,
            show: this.show,
            close: this.close,
        }
        return (
            <modalContext.Provider value={values}>
                {this.props.children}
            </modalContext.Provider>
        )
    }
}

export class ModalButton extends React.Component {
    render() {
        return (
            <modalContext.Consumer>
                {
                    (values) => {
                        return (
                            <div>
                            <div style={{ display: values.open ? 'flex' : 'none', width: 300, height: 300, backgroundColor: 'green' }}>
                            </div>
                            <button onClick={()=>{
                                console.log(values)
                                if(values.open){
                                    values.close()
                                }else{
                                    values.show()
                                }
                            }}>Click</button>
                        </div>

                        )
                    }
                }
            </modalContext.Consumer>
        )
    }
}

export default ModalButton;