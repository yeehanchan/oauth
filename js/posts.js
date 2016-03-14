/* make the API call */
FB.api(
    "/me/feed",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);
