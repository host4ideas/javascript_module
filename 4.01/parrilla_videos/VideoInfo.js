class VideoInfo {
    constructor(DATA) {
        let videoData = getVideoInfo(DATA);
        this.vidId = videoData[0];
        this.title = videoData[1];
        this.duration = videoData[2];
        this.date = videoData[3];
        this.visits = videoData[4];
        this.thumbnail = setThumbnail(videoData[0]);

        // Get the video info from the parsed JSON data
        function getVideoInfo(DATA) {
            let year = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[0];
            let month = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[1]
            let day = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[2];
            let publishedDate = new Date(year, month, day);
            let totalDuration = DATA['items'][0]['contentDetails']['duration'].split("PT")[1].toLowerCase();
            let seconds = totalDuration.split("m")[1].replace("s", "");
            let minutes = totalDuration.split("m")[0];
            let hours = totalDuration.split("h")[0];
            totalDuration = ((hours == "NaN") ? hours : 0) + ":" + ((minutes == "NaN") ? minutes : 0) + ":" + seconds;
            // Create the video object
            return [DATA['items'][0]['id'], DATA['items'][0]['snippet']['title'], totalDuration, publishedDate, DATA['items'][0]['statistics']['viewCount']];
        }
        // We set this setter as a function to block someone to set the thumbnail
        function setThumbnail(id) {
            return "https://img.youtube.com/vi/" + id + "/default.jpg";
        }
    }

    get getVidId() {
        return this.vidId;
    }

    get getTitle() {
        return this.title;
    }

    get getDuration() {
        return this.duration;
    }

    get getDate() {
        return this.date;
    }

    get getVisits() {
        return this.visits;
    }

    get getThumbnail() {
        return this.thumbnail;
    }

    // set setThumbnail(id) {
    //     return "https://img.youtube.com/vi/" + id + "/default.jpg";
    // }

    showInfo() {
        let cajaInfo = document.createElement("div");
        cajaInfo.setAttribute("class", "video-info");
        cajaInfo.innerHTML = "<p><b>" + this.getTitle + "</b></p><p>" + this.getDate.getDate() + "/" + (this.getDate.getMonth() + 1) + "/" + this.getDate.getFullYear() + "</p><p>Duration: " + this.getDuration + "</p><p>Visits: " + this.getVisits + "</p><img src=" + this.getThumbnail + ">";
        return cajaInfo;
    }
}
