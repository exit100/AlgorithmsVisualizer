function Quick(divs, div_sizes) {

    c_delay = 0;

    quick_sort(divs, div_sizes, 0, array_size - 1);

    enable_buttons();
}

function quick_partition(divs, div_sizes, start, end) {

    var piv = div_sizes[start];//make the first element as pivot element.
    var lb = start;
    var ub = end;
    div_update(divs[start], div_sizes[start], "blue");//Color update

    while (lb < ub) {
        while (div_sizes[lb] <= piv) {
            lb++;
            div_update(divs[lb], div_sizes[lb], "red");
            div_update(divs[lb], div_sizes[lb], "orange");
        }
        while (div_sizes[ub] > piv) {
            ub--;
            div_update(divs[ub], div_sizes[ub], "purple");
            div_update(divs[ub], div_sizes[ub], "orange");
        }
        if (lb < ub) {

            div_update(divs[lb], div_sizes[lb], "black");
            div_update(divs[ub], div_sizes[ub], "black");

            var temp = div_sizes[lb];
            div_sizes[lb] = div_sizes[ub];
            div_sizes[ub] = temp;

            div_update(divs[lb], div_sizes[lb], "black");
            div_update(divs[ub], div_sizes[ub], "black");

            div_update(divs[lb], div_sizes[lb], "orange");
            div_update(divs[ub], div_sizes[ub], "orange");
        }
    }
    // div_update(divs[lb], div_sizes[lb], "orange");
    div_update(divs[start], div_sizes[start], "black");
    div_update(divs[ub], div_sizes[ub], "black");

    var temp = div_sizes[start];
    div_sizes[start] = div_sizes[ub];
    div_sizes[ub] = temp;

    div_update(divs[start], div_sizes[start], "black");
    div_update(divs[ub], div_sizes[ub], "black");

    div_update(divs[start], div_sizes[start], "orange");
    div_update(divs[ub], div_sizes[ub], "orange");

    return ub;//return the position of the pivot



}

function quick_sort(divs, div_sizes, start, end) {
    if (start < end) {
        //stores the position of pivot element
        var piv_pos = quick_partition(divs, div_sizes, start, end);
        quick_sort(divs, div_sizes, start, piv_pos - 1);//sorts the left side of pivot.
        quick_sort(divs, div_sizes, piv_pos + 1, end);//sorts the right side of pivot.
        for (var t = start; t <= end; t++) {
            div_update(divs[t], div_sizes[t], "green");//Color update
        }
    }
}
