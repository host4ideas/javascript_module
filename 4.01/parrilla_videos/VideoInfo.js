class VideoInfo {
    constructor(DATA) {
        let videoData = setVideoInfo(DATA);
        var vidId = videoData[0];
        var title = videoData[1];
        var duration = videoData[2];
        var date = videoData[3];
        var visits = videoData[4];
        var thumbnail = setThumbnail(videoData[0]);

        // Closure
        var counterVisits = (function () {
            let counter = -1;
            return function () { counter += 1; return counter }
        })();

        function setVideoInfo(DATA) {
            let year = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[0];
            let month = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[1] - 1;
            let day = DATA['items'][0]['snippet']['publishedAt'].split("T")[0].split("-")[2];
            let publishedDate = new Date(year, month, day);
            let totalDuration = DATA['items'][0]['contentDetails']['duration'].split("PT")[1].toLowerCase();
            let seconds = totalDuration.split("m")[1].replace("s", "");
            let minutes = totalDuration.split("m")[0];
            let hours = totalDuration.split("h")[0];
            totalDuration = ((hours == "NaN") ? hours : 0) + ":" + ((minutes == "NaN") ? minutes : 0) + ":" + seconds;
            // Return the video array info
            return [DATA['items'][0]['id'], DATA['items'][0]['snippet']['title'], totalDuration, publishedDate, DATA['items'][0]['statistics']['viewCount']];
        }

        // We set this setter as a function to block someone to set the thumbnail
        function setThumbnail(id) {
            return "https://img.youtube.com/vi/" + id + "/default.jpg";
        }
        this.getVidId = function () { return vidId; }

        this.getTitle = function () { return title; }

        this.getDuration = function () { return duration; }

        this.getDate = function () { return date; }

        this.getVisits = function () { return visits; }

        this.getThumbnail = function () { return thumbnail; }

        this.getCounter = function () { return counterVisits(); }

        this.showInfo = function () {
            let cajaInfo = document.createElement("div");
            cajaInfo.setAttribute("class", "video-info");
            cajaInfo.innerHTML = "<p><b>" + this.getTitle() + "</b></p><p>" + this.getDate().getDate() + "/" + (this.getDate().getMonth() + 1) + "/" + this.getDate().getFullYear() + "</p><p>Duration: " + this.getDuration() + "</p><p>Visits: " + this.getVisits() + "</p><img src=" + this.getThumbnail() + ">";
            return cajaInfo;
        }
    }

}
