$(function () {
    function addFooter() {
        $("#entireFooter").html(` <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12">
                    <h5 class="white-text">Food Lovers</h5>
                    <p class="grey-text text-lighten-4">Local recommendations from local people</p>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text">Links</h5>
                    <ul>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!"> Careers</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!"> About Us</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!"> Privacy Policy</a>
                        </li>
                        <li>
                            <a class="grey-text text-lighten-3" href="#!">Terms of Service</a>
                        </li>


                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                    © 2018, Food Lovers, Inc. All rights reserved. Food Lovers and the Food Lovers logo are trademarks or registered trademarks of Food Lovers, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners. Non-US transactions through Food Lovers International, S.à r.l. 
                <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
        </div>
    </footer>`)
    }
    addFooter();
})