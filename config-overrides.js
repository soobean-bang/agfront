const {
    addDecoratorsLegacy,
    disableEsLint, // THIS IS NOT TURNING OFF eslint
    override,
} = require("customize-cra");

module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy()
    ),
};