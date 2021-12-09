class VideosList extends VideoInfo {
    constructor(DATA, array) {
        let newVideo = super(DATA);
        // Define this (object VideosList) as an array
        // this.length = 0; // initialise a length
        // Array.prototype.push.apply(this, newVideo); // push onto the instance

        array.push(newVideo);
    }
}
