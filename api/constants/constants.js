var constants = {
  NO_AUTH_RESPONSE: {
    message: "user not Login"
  },
  DEFAULT_RESPONSE: {
    message: "Api is running"
  },
  youtube_option: {
    maxResults: 10,
    key: 'AIzaSyCoRaVdzsqAe2k_jeDeMVzlVUyL0UKRrqI'
  },
  trending_option: {
    uri: 'https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=25&key=AIzaSyCoRaVdzsqAe2k_jeDeMVzlVUyL0UKRrqI',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  },
  related_option: {
    uri: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyCoRaVdzsqAe2k_jeDeMVzlVUyL0UKRrqI&maxResults=25&relatedToVideoId=',
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  }
};

module.exports = constants;
