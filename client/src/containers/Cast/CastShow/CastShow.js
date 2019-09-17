import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Skits from '../../../components/Skits/Skits';
import classes from './CastShow.module.scss';

class CastShow extends React.Component{
    state = {
        member: {},
        loading: true
    }

    componentDidMount(){
        this.getCastMemberData(this.props.match.params.id);
    }

    getCastMemberData = (id) => {
        fetch(`/api/cast/${id}`)
            .then( data => data.json() )
            .then( results => this.setState({member: results, loading: false}) )
    }

    render(){
        let pageContent = 'טוען...';
        
        if(!this.state.loading){
            pageContent = (
                <>
                    <section className={classes.image}>
                        <img src={this.state.member.image} alt={this.state.member.name} />
                    </section>

                    <section className={classes.title}>
                        <h1>{this.state.member.name}</h1>
                        <p>{this.state.member.team}</p>
                    </section>

                    <section className={classes.admin}>
                        <Link to="">ערוך</Link> 
                        <form>
                            <button type="submit">מחק</button>
                        </form>
                    </section>

                    <section className={classes.description}>
                        <p>{this.state.member.description}</p>
                    </section>

                    <Skits skits={this.state.member.skits} title={`מערכונים בהשתתפות ${this.state.member.name}:`} />
                </>
            )
        }
        
        return(
            <div className={classes.CastShow}>
                {pageContent}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        team_labels: state.team_labels
    }
}
export default connect(mapStateToProps)(CastShow);