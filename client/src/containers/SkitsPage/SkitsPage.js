import React from 'react';
import Cover from '../../components/UI/Cover/Cover'; 
import Skits from '../../components/Skits/Skits';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-domino';

class SkitsPage extends React.Component{
    state = {
        error: false,
        loading: false,
        allSkits: []
    }

    componentDidMount(){
        this.setState({loading: true})

        axios.get('/')
            .then( response => {
                this.setState({
                    allSkits: response.data,
                    loading: false,
                    error: false
                })
            }).catch( error => {
                this.setState({loading: false, error: error.message})
            })
    }

    render(){
        let skitsHTML = <Skits skits={this.state.allSkits} title="כל המערכונים" />;

        if(this.state.loading){
            skitsHTML = <Spinner message="טוען מערכונים"/>
        }else if(this.state.error){
            skitsHTML = <p>{this.state.error}</p>
        }


        return(
            <>
                <Cover />
                {skitsHTML}
            </>    
        )
    }
}

export default SkitsPage;