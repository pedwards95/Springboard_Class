function choice(items) {
    return items[Math.floor(Math.random()*items.length)-1];
}

function remove(items, item) {
    if(items.includes(item)) {
        items = items.splice(items.indexOf(item),1);
        return item;
    }
    return undefined;
}


export { choice,remove };