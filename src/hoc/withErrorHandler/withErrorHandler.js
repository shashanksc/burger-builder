import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'
const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component {
        state ={
            error: null
        }
        componentDidMount(){
            axios.interceptors.request.use( req =>{
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res=>res, error=>{
                this.setState({error: error});
            });
        }
        errorConfirmedHandler = ()=>{
            this.setState({error: null});
        }
        render(){
            return (<Auxiliary>
                <Modal 
                    show ={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null} {/*error object will have a message property form firebase.*/}
                </Modal>
            <WrappedComponent {...this.props} />
        
            </Auxiliary>)
        }
    }
}

export default withErrorHandler;