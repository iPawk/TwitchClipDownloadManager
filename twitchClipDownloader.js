function downloadSelectedVideos(){
    for (var elem in document.querySelectorAll('[data-target="clips-manager-table-row"]')){
        let row = document.querySelectorAll('[data-target="clips-manager-table-row"]')[elem];
        let boxChecked = row.getElementsByClassName('tw-checkbox__input')[0].checked;
        let jpgSource = row.getElementsByClassName('clmgr-thumb tw-flex-shrink-0 tw-mg-r-1')[0].src;
        if (boxChecked && jpgSource && jpgSource.indexOf('https://clips-media') !== -1){
            jpgSource = jpgSource.substring(38);
            jpgSource = jpgSource.substr(0, jpgSource.indexOf('.jpg'));
            if (jpgSource.indexOf('-preview') !== -1){
                jpgSource = jpgSource.substr(0, jpgSource.indexOf('-preview'));
            }
            let downloadURL = 'https://clips-media-assets2.twitch.tv/' + jpgSource + '.mp4';
            window.open(downloadURL);
        }
    }
}

function placeDownloadButton(){
    if (!document.getElementsByClassName('clipDownloaderButton').length){
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<button class="clipDownloaderButton">Download</button>';
        var downloadButton = wrapper.firstChild;
        document.getElementsByClassName('tw-align-items-center tw-flex tw-full-height tw-pd-x-1 tw-pd-y-05')[0].appendChild(downloadButton);
        document.getElementsByClassName('clipDownloaderButton')[0].addEventListener("click", downloadSelectedVideos);
    }
}

function removeDownloadButton(){
    if (document.getElementsByClassName('clipDownloaderButton').length){
        document.getElementsByClassName('clipDownloaderButton')[0].remove();
    }
}

function checkNumBoxes(){
    let anyChecked = false;
    for (var elem in document.querySelectorAll('[data-test-selector="clips-manager-row-checkbox"] input')){
        if (document.querySelectorAll('[data-test-selector="clips-manager-row-checkbox"] input')[elem].checked){
            anyChecked = true;
            break;
        }
    }

    if (anyChecked){
        placeDownloadButton();
    }
    else{
        removeDownloadButton();
    }
}

document.addEventListener("click", checkNumBoxes);