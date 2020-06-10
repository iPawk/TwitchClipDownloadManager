function downloadSelectedVideos(){
    var allDownloadURLs = [];
    for (var elem in document.querySelectorAll('[data-target="clips-manager-table-row"]')){
        let row = document.querySelectorAll('[data-target="clips-manager-table-row"]')[elem];
        if ((typeof row) != 'object'){
            continue;
        }
        let boxChecked = row.getElementsByClassName('tw-checkbox__input').length > 0 && row.getElementsByClassName('tw-checkbox__input')[0] && row.getElementsByClassName('tw-checkbox__input')[0].checked;
        let jpgSource = row.getElementsByClassName('clmgr-thumb tw-flex-shrink-0 tw-mg-r-1')[0].src;
        if (boxChecked && jpgSource && jpgSource.indexOf('https://clips-media') !== -1){
            jpgSource = jpgSource.substring(38);
            jpgSource = jpgSource.substr(0, jpgSource.indexOf('.jpg'));
            if (jpgSource.indexOf('-preview') !== -1){
                jpgSource = jpgSource.substr(0, jpgSource.indexOf('-preview'));
            }
            let downloadURL = 'https://clips-media-assets2.twitch.tv/' + jpgSource + '.mp4';
            allDownloadURLs.push(downloadURL);
        }
    }
    
    if (confirm('Download ' + allDownloadURLs.length + ' clip' + (allDownloadURLs.length == 1 ? '' : 's') + '?')){
        for (var i = 0; i < allDownloadURLs.length; i++){
            window.open(allDownloadURLs[i]);
        }
    }
}

function placeDownloadButton(){
    if (!document.getElementsByClassName('clipDownloaderButtonDark').length){
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<button class="clipDownloaderButtonDark tw-align-items-center tw-flex-shrink-0 tw-full-height" style="margin-left: 5px;padding-left: 6px;padding-right: 6px;border-radius: 4px;"><img src="' + browser.runtime.getURL("images/downloadIconDarkMode-64.png") + '" width="18"/></button>';
        var downloadButtonDarkMode = wrapper.firstChild;
        document.getElementsByClassName('tw-align-items-center tw-flex tw-full-height tw-pd-x-1 tw-pd-y-05')[0].appendChild(downloadButtonDarkMode);
        document.getElementsByClassName('clipDownloaderButtonDark')[0].addEventListener("click", downloadSelectedVideos);

        wrapper = document.createElement('div');
        wrapper.innerHTML = '<button class="clipDownloaderButtonLight tw-align-items-center tw-flex-shrink-0 tw-full-height" style="margin-left: 5px;padding-left: 6px;padding-right: 6px;border-radius: 4px;"><img src="' + browser.runtime.getURL("images/downloadIconLightMode-64.png") + '" width="18"/></button>';
        var downloadButtonLightMode = wrapper.firstChild;
        document.getElementsByClassName('tw-align-items-center tw-flex tw-full-height tw-pd-x-1 tw-pd-y-05')[0].appendChild(downloadButtonLightMode);
        document.getElementsByClassName('clipDownloaderButtonLight')[0].addEventListener("click", downloadSelectedVideos);
        
        var css = '.clipDownloaderButtonDark:hover{ background: #404040; } .clipDownloaderButtonLight:hover{ background: #F2F2F2; } .tw-root--theme-dark .clipDownloaderButtonLight{display: none;} html:not(.tw-root--theme-dark) .clipDownloaderButtonDark{display: none;}';
        var style = document.createElement('style');

        if (style.styleSheet){
            style.styleSheet.cssText = css;
        }
        else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

function removeDownloadButton(){
    if (document.getElementsByClassName('clipDownloaderButtonDark').length){
        document.getElementsByClassName('clipDownloaderButtonDark')[0].removeEventListener("click", downloadSelectedVideos);
        document.getElementsByClassName('clipDownloaderButtonLight')[0].removeEventListener("click", downloadSelectedVideos);
        document.getElementsByClassName('clipDownloaderButtonDark')[0].remove();
        document.getElementsByClassName('clipDownloaderButtonLight')[0].remove();
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