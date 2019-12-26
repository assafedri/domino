import React, { useEffect, useCallback } from 'react';
import classes from './CastShow.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Skits from '../../../components/Skits/Skits';
import { startWikipediaInfo, clearWikipediaInfo } from '../../../store/actions/cast'

const CastShow = props => {
    const dispatch = useDispatch();
    const fetchWiki = (name) => dispatch(startWikipediaInfo(name));
    const clearWiki = useCallback(() => dispatch(clearWikipediaInfo()), [dispatch]);
    const cast = useSelector(state => state.cast );
    const wiki = useSelector(state => state.wiki )

    let member = null;
    let pageHTML = '';

    useEffect( () => {
        return () => clearWiki();
    }, [clearWiki] )

    if(cast){
        member = cast.reduce( (res, group) => {
            let memData = (group.data.find( member => member._id === props.match.params.id ));
            return memData ? {...memData, group_label: group.label} : res;
        },{});
        fetchWiki(member.name)
    }

    if(member){
        pageHTML = (
            <div className={classes.CastShow}>
                <div className={classes.Image} style={{backgroundImage: `url(${member.image})`}} />
                <div className={classes.Title}>
                    <h1>{member.name}</h1>
                    <h3>{member.group_label}</h3>
                </div>
                <div className={classes.Wiki}>{wiki}</div>
                <Skits
                    id={member._id}
                    skits={member.skits} 
                    title={`מערכונים עם ${member.name}:`} />
            </div>
        )
    }
    

    return pageHTML;
};

// const mapStateToProps = state => {
//     return {
//         cast: state.cast,
//         wiki: state.wiki
//     }
// }

// const mapDisparchToProps = dispatch => {
//     return {
//         fetchWiki: (name) => dispatch(startWikipediaInfo(name)),
//         clearWiki: () => dispatch(clearWikipediaInfo())
//     }
// }


export default CastShow;
























// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import Skits from '../../../components/Skits/Skits';


// class CastShow extends React.Component{
//     state = {
//         member: {},
//         loading: true
//     }

//     componentDidMount(){
//         this.getCastMemberData(this.props.match.params.id);
//     }

//     getCastMemberData = (id) => {
//         fetch(`/api/cast/${id}`)
//             .then( data => data.json() )
//             .then( results => this.setState({member: results, loading: false}) )
//     }

//     render(){
//         let pageContent = 'טוען...';
        
//         if(!this.state.loading){
//             pageContent = (
//                 <>
//                     <section className={classes.image}>
//                         <img src={this.state.member.image} alt={this.state.member.name} />
//                     </section>

//                     <section className={classes.title}>
//                         <h1>{this.state.member.name}</h1>
//                         <p>{this.state.member.team}</p>
//                     </section>

//                     <section className={classes.admin}>
//                         <Link to="">ערוך</Link> 
//                         <form>
//                             <button type="submit">מחק</button>
//                         </form>
//                     </section>

//                     <section className={classes.description}>
//                         <p>{this.state.member.description}</p>
//                     </section>

//                     <Skits skits={this.state.member.skits} title={`מערכונים בהשתתפות ${this.state.member.name}:`} />
//                 </>
//             )
//         }
        
//         return(
//             <div className={classes.CastShow}>
//                 {pageContent}
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         team_labels: state.team_labels
//     }
// }
// export default connect(mapStateToProps)(CastShow);