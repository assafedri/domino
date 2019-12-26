const mongoose      = require('mongoose');
const Skit          = require('./models/skit');
const Actor         = require('./models/actor');
const Comment       = require('./models/comment');
const User          = require('./models/user');
const csv           = require('csv-parser');
const fs            = require('fs');

const actors = [
    {
        name: "אסי כהן", 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Asi_Cohen.jpg/250px-Asi_Cohen.jpg' ,
        team: "originals"
    },
    {
        name: "גורי אלפי", 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Gav_Ha%27uma_2_-_Guri_Alfi.jpg/250px-Gav_Ha%27uma_2_-_Guri_Alfi.jpg' ,
        team: "originals"
    },
    {
        name: "אדיר מילר", 
        image: 'https://www.ynet.co.il/PicServer4/2016/06/08/7057916/FEED_adir.jpg' ,
        team: "originals"
    },
    {
        name: "רועי בר נתן", 
        image: 'https://img.mako.co.il/2012/05/24/wqwwqwq2_g.jpg' ,
        team: "originals"
    },
    {
        name: "טלי אורן", 
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Tali_Oren.jpg/230px-Tali_Oren.jpg' ,
        team: "originals"
    },
    {
        name: "רותם אבוהב", 
        image: 'https://www.ynet.co.il/PicServer2/24012010/2672262/ia02Rotem_abuhav2-wa.jpg' ,
        team: "originals"
    },
    {
        name: "שגית סול", 
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Sagit_Sol_portrait.jpg' ,
        team: "originals"
    },
    {
        name: "אילן פלד", 
        image: 'http://www.zohar-agency.com/wp-content/uploads/%D7%90%D7%99%D7%9C%D7%9F-%D7%A4%D7%9C%D7%93-%D7%97%D7%93%D7%A91.jpg' ,
        team: "next-gen"
    },
    {
        name: "ענת מגן שבו", 
        image: 'https://www.cameri.co.il/prdPics/shows/mobile_10532_213655_show_image.jpg' ,
        team: "next-gen"
    },
    {
        name: "עדי אשכנזי", 
        image: 'https://images1.ynet.co.il/xnet//PicServer2/pic/20122006/73740/LAI033659_360.jpg' ,
        team: "next-gen"
    },
    {
        name: "מיה דגן", 
        image: 'http://www.yitzug1.co.il/sites/default/files/styles/big_image/public/12006.jpg?itok=5cuaIfW6' ,
        team: "next-gen"
    },
    {
        name: "שלומי קוריאט", 
        image: 'https://images1.calcalist.co.il/PicServer3/2017/08/09/748273/1NL.jpg' ,
        team: "next-gen"
    },
    {
        name: "יובל סמו", 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ZM3SKBuxTMyPGXCxiJj5ZV7qny_Cikil6NZTcgikwrllxjwK' ,
        team: "next-gen"
    },
    {
        name: "אופיר לובל", 
        image: 'https://img.wcdn.co.il/f_auto,w_300,t_18/3/2/9/5/329535-46.jpg' ,
        team: "next-gen"
    },
    {
        name: "מיכל אטלס", 
        image: 'https://www.shaham.org.il/cstPics/profilePictures/big_5991_cst_profile.jpg?t=1518244210' ,
        team: "next-gen"
    },
    {
        name: "עירית קפלן", 
        image: 'https://www.ht1.co.il/_Uploads/dbsArticles/irit_kaplan.jpg' ,
        team: "next-gen"
    },
]

async function seedDb(){
    try {
        console.log('Deleting Data...');
        await Comment.deleteMany({});
        await Skit.deleteMany();
        await Actor.deleteMany();
        let user = await User.findOne({username: 'assaf244'})

        console.log('Creating Cast...');
        for (actor of actors){
            let newActor = await Actor.create(actor);
            newActor.author.id = user._id;
            newActor.author.username = user.username;
            newActor.save()
            actor.id = newActor._id;
        }

        console.log('Reading CSV...');
        fs.createReadStream('seed.csv').pipe(csv()).on('data', async(row) => {
                if(row.youtube_id !== ''){
                    console.log('Proccessing ' + row.youtube_id);
                    const obj = {
                        name: row.name,
                        youtube_id: row.youtube_id,
                        aired: {
                            season: parseInt(row.season),
                            episode: parseInt(row.episode)
                        },
                        actors: row.actors.split(",").map( item => parseInt(item))
                    }

                    const data = {
                        name: obj.name,
                        youtube_id: obj.youtube_id,
                        aired: obj.aired
                    }

                    let newSkit = await Skit.create(data);
                    newSkit.author.id = user._id;
                    newSkit.author.username = user.username;
                    
                    for(index of obj.actors){
                        newSkit.actors.push(actors[index -1].id)
                    }

                    newSkit.save()

                    for(actor of obj.actors){
                        let foundActor = await Actor.findById(actors[actor-1].id);
                        foundActor.skits.push(newSkit)
                        foundActor.save();
                    }
                }
            })   
            .on('end', row => console.log('end'))
   
    } catch (error) {
        console.log(error)
    }

}

module.exports = seedDb;



// // let comment = await Comment.create({
// //     text: 'This is a comment',
// //     author: 'Assaf'
// // })
// // skit.comments.push(comment);
// // skit.save();