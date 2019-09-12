import React from "react";
import Cast from '../../components/Cast/Cast';
import axios from '../../axios-domino';
import {withRouter} from 'react-router-dom'
import Member from '../../components/Cast/Member/Member'

import classes from './CastPage.module.scss'

class CastPage extends React.Component{
    state = {
        cast: [],
        loading: false,
        error: false,
        selected: null
    }

    componentDidMount(){
        this.setState({loading: false})

        axios.get('api/cast')
            .then(response => {
                let index = 0;

                if(this.props.match.params.id){
                    index = response.data.findIndex( el => el._id === this.props.match.params.id);
                }

                this.setState({
                    cast: response.data, 
                    loading: false, 
                    error: false, 
                    selected: response.data[index]
                });
            })
            .catch( error => {
                console.log(error)
                this.setState({loading: false, error: error.message})
            })
    }

    castClickHandler = (e) => {
        const targetId = e.target.parentNode.id
        const selectedIndex = this.state.cast.findIndex( el => el._id === targetId)
        
        this.setState((prevState) => {
            return {
                cast: prevState.cast,
                selected: prevState.cast[selectedIndex]
            }
        })
        this.props.history.push('/cast/' + this.state.cast[selectedIndex]._id)
    }

    render(){
        let castHTML = ''
        let selectedHTML = ''
        
        if(this.state.cast.length > 0){
            castHTML = (
                <>
                    <section>
                        <h1>שחקנים</h1>
                        <p>כאן תוכלו למצוא את כל מי שהשתתף בדומינו</p>
                    </section>
                    <Cast cast={this.state.cast} clicked={this.castClickHandler} selected={this.state.selected._id} />
                </>
            )
            selectedHTML = <p>למידע נוסף, לחץ על תמונה</p>
        }

        if(this.state.selected){
            selectedHTML = <Member member={this.state.selected} />
        }

        return(
            <div className={classes.CastPage} >
                {castHTML}
                {selectedHTML }
            </div>    
        )
    }
}

export default withRouter(CastPage);