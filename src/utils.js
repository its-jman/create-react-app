exports.exists = (e) => e !== null && e !== undefined && e !== "";
exports.cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));
