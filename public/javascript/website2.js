let left=document.getElementById('left');
let right=document.getElementById('right');
let slider=document.getElementById('slider');
let increment=0;

const rightClick = () => {
    //my card width is 600 view point
    if (increment >= 0 && increment < 1800) {
        increment += 600;
        console.log("right side", increment);
        slider.scrollTo(increment, 0);
    }
}

const leftClick = () => {
    if (increment >= 600) {
        increment -= 600;
        console.log("left side", increment);
        slider.scrollTo(increment, 0);
    }
}

right.addEventListener("click", rightClick);
left.addEventListener("click", leftClick);


let had = document.getElementById('tabHeading');
let desc = document.getElementById('tabDesc');

document.getElementById("wordpress").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for WordPress";
    desc.textContent = "We Live and breathe wordpress. our manged hosting for wordpress and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("magento").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for Magento";
    desc.textContent = "We Live and breathe magento. our manged hosting for magento and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("laravel").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for Laravel";
    desc.textContent = "We Live and breathe Laravel. our manged hosting for Laravel and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});

document.getElementById("php").addEventListener('click',() => {
    had.textContent = "The Best Managed Cloud Hosting for PHP";
    desc.textContent = "We Live and breathe PHP. our manged hosting for PHP and WooCommerce tacks away cloud server related hassles so you can scale your website the way you want.";
});