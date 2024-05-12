
function Selection_sort(divs, div_sizes) {

    c_delay = 0;

    for (var i = 0; i < array_size - 1; i++) {

        index_min = i;

        div_update(divs[index_min], div_sizes[index_min], "blue");//Color update
        for (var j = i + 1; j < array_size; j++) {
            if (div_sizes[j] < div_sizes[index_min]) {

                div_update(divs[j], div_sizes[j], "red");//Color update
                div_update(divs[index_min], div_sizes[index_min], "orange");//Color update
                div_update(divs[i], div_sizes[i], "blue");//Color update
                index_min = j;
                div_update(divs[index_min], div_sizes[index_min], "blue");//Color update
            }

            else {
                //  div_update(divs[i], div_sizes[i], "orange");
                div_update(divs[j], div_sizes[j], "red");//Color update
                div_update(divs[j], div_sizes[j], "orange");
            }

        }

        var temp = div_sizes[index_min];
        div_sizes[index_min] = div_sizes[i];
        div_sizes[i] = temp;


        div_update(divs[index_min], div_sizes[index_min], "blue");//Height update
        div_update(divs[i], div_sizes[i], "blue");//Height update
        div_update(divs[index_min], div_sizes[index_min], "orange");


        div_update(divs[i], div_sizes[i], "green");//Color update
    }
    div_update(divs[i], div_sizes[i], "green");//Color update

    enable_buttons();
}
