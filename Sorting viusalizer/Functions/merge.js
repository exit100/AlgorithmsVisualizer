
function Merge(divs, div_sizes) {
    c_delay = 0;

    merge_partition(divs, div_sizes, 0, array_size - 1);

    enable_buttons();
}

function merge_sort(divs, div_sizes, start, mid, end) {
    var i = start, j = mid + 1;

    var Arr = [], k = start;

    while (i <= mid && j <= end) {
        if (div_sizes[i] < div_sizes[j]) {
            Arr[k] = div_sizes[i];
            div_update(divs[i], div_sizes[i], "red");//Color update
            i++;
        }
        else {
            Arr[k] = div_sizes[j];
            div_update(divs[j], div_sizes[j], "red");//Color update
            j++;
        }
        k++;
    }

    while (i <= mid) {
        Arr[k] = div_sizes[i];
        div_update(divs[i], div_sizes[i], "red");//Color update
        i++;
        k++;
    }

    while (j <= end) {
        Arr[k] = div_sizes[j];
        div_update(divs[j], div_sizes[j], "red");//Color update
        j++;
        k++;
    }


    for (var t = start; t <= end; t++) {
        div_sizes[t] = Arr[t];
        div_update(divs[t], div_sizes[t], "green");//Color update
    }
}

function merge_partition(divs, div_sizes, start, end) {
    if (start < end) {
        var mid = Math.floor((start + end) / 2);
        div_update(divs[mid], div_sizes[mid], "blue");//Color update

        merge_partition(divs, div_sizes, start, mid);
        merge_partition(divs, div_sizes, mid + 1, end);

        merge_sort(divs, div_sizes, start, mid, end);
    }
}
