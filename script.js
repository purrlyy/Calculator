 function clearDisplay() {
            document.getElementById("display").innerText = "0";
        }

        function appendToDisplay(value) {
            let currentDisplay = document.getElementById("display").innerText;
            if (currentDisplay === "0") {
                document.getElementById("display").innerText = value;
            } else {
                document.getElementById("display").innerText += value;
            }
        }

        function calculateResult() {
            let currentDisplay = document.getElementById("display").innerText;
            try {
                let result = eval(currentDisplay);
                document.getElementById("display").innerText = result;
            } catch (e) {
                document.getElementById("display").innerText = "Error";
            }
        }

        function applyPreset() {
            const site = document.getElementById("site-select").value;
            let title, favicon;

            switch (site) {
                case "google":
                    title = "Google";
                    favicon = "https://www.google.com/favicon.ico";
                    break;
                case "ixl":
                    title = "IXL Learning";
                    favicon = "https://www.ixl.com/favicon.ico";
                    break;
                case "epic":
                    title = "Epic!";
                    favicon = "https://www.getepic.com/favicon.ico";
                    break;
                case "powerschool":
                    title = "PowerSchool";
                    favicon = "https://www.powerschool.com/favicon.ico";
                    break;
            }

            document.title = title;
            updateFavicon(favicon);
        }

        function applyCustomSite() {
            const customSite = document.getElementById("custom-site").value;
            if (customSite) {
                document.title = customSite;
                const favicon = `https://www.google.com/s2/favicons?domain=${customSite}`;
                updateFavicon(favicon);
            } else {
                alert("Please enter a valid site URL.");
            }
        }

        function updateFavicon(favicon) {
            let link = document.querySelector("link[rel='icon']");
            if (!link) {
                link = document.createElement("link");
                link.rel = "icon";
                document.head.appendChild(link);
            }
            link.href = favicon;
        }

        function openSettings() {
            document.getElementById("settingsModal").style.display = "flex";
        }

        function closeSettings() {
            document.getElementById("settingsModal").style.display = "none";
        }
