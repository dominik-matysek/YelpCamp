const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');
const axios = require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

  // call unsplash and return small image
async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'IELc-qJKL_cOMwvHL8AmT3UgPJK7sstT0MgCTs82QRs',
        collections: 483251,
      },
    })
    return resp.data.urls.small
  } catch (err) {
   console.error(err)
  }
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) +10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://unsplash.com/photos/lake-sorrounded-by-trees-4hhP-Ud4e84',
            image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos perspiciatis enim nemo consequatur unde in at maiores dolorem laudantium eius. Numquam voluptates fuga molestiae aperiam consequuntur adipisci voluptate minima iusto.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})