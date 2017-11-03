$(function () {
    var reelSound = new Audio('../../Content/spin1.mp3');
    if (typeof reelSound.loop == 'boolean') {
        reelSound.loop = true;
    }
    else {
        reelSound.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    var reelStopSound = new Audio('../../Content/roll.mp3');
    var winSound = new Audio('../../Content/Winsound.mp3');

    var images = [];
    for (var i = 0; i < 10; i++) {
        images.push('<img height="126px" width="200px" src="../../Content/imagesslot/' + i + '.png">');
    }

    var spinning = false;
    var w = 0;
    var slots = new EZSlots("slotmachine", { "reelCount": 3, "winningSet": [0, 0, 0], "symbols": images, "height": 126, "width": 200, "sliderWidth": 200, "sliderHeight": 320, "callback": spinCallback });

    function spin(reel1, reel2, reel3, winnings) {
        w = winnings;
        spinning = true;
        reelSound.play();
        slots.customSpin([reel1, reel2, reel3]);
    }

    function spinCallback(results) {
        spinning = false;
        reelSound.pause();
        reelSound.currentTime = 0;
        reelStopSound.play();
        if (w > 0) {
            var n = noty({
                layout: 'topCenter',
                text: "You won " + w + "ETH",
                type: 'success',
                timeout: 2000
            });
            winSound.play();
        }
    }

    spin(1, 1, 1, 10);

});