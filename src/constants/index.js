const isLocalHost = window.location.href.includes('localhost');
const values = {
    TASK_1_MINIMUM_WORDS: 150,
    TASK_2_MINIMUM_WORDS: 250,
    TASK_1_DURATION: 1200,
    TASK_2_DURATION: 2400,
    EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    API_URL: isLocalHost ? 'http://localhost:5000' : 'https://ielts-peer-prep.herokuapp.com'
}


export const wordCount = (answer) => {
    let currentWords = 0;
    if (typeof (answer) == 'undefined')
        return 0;
    else
        return currentWords = answer.trim().replace(/\n/g, ' ').split(' ').length;
}

export default values;