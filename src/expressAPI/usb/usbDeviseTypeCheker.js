const typeUSBArray = [
    "Storage",
    "USB DRIVE",
    "FLASH",
    "Flash",
    "DataTraveler",
    "QUMO",
    "HDD"
];
const whatType = str => {
    const isThisType = typeArray => {
        return typeArray
            .map(type => {
                const index = str.indexOf(type);
                return index < 0 ? false : true;
            })
            .includes(true);
    };
    if (isThisType(typeUSBArray)) return `usb`;
    else return `question`;
};
module.exports = whatType;