function starOutGrid(myGrid) {
    let grid = myGrid;
    let starMe = [];
    for(let y = 0; y<grid.length; y++) {
        for(let x = 0; x<grid[y].length; x++) {
            if(grid[y][x] == "*") {
                starMe.push([`${y}`,`${x}`])
            }
        }
    }

    for(let z = 0; z<starMe.length; z++) {
        let count = 0;
        while (count < grid.length) {
            grid[count][starMe[z][1]] = "*";
            count++;
        }
        count = 0;
        while (count < grid[starMe[z][0]].length) {
            grid[starMe[z][0]][count] = "*";
            count++;
        }
    }
    console.log(grid);
    return grid;
}
