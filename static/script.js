async function scanPorts() {

    const target = document.getElementById("target").value;
    const startPort = document.getElementById("start_port").value;
    const endPort = document.getElementById("end_port").value;

    if (target === "" || startPort === "" || endPort === "") {

        alert("Please fill in all fields.");

        return;

    }

    document.getElementById("status").innerHTML = "🔍 Scanning...";
    document.getElementById("progress-bar").style.width = "40%";

    try {

        const response = await fetch("/scan", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                target: target,
                start_port: startPort,
                end_port: endPort

            })

        });

        const data = await response.json();

        document.getElementById("progress-bar").style.width = "100%";

        if (data.error) {

            document.getElementById("status").innerHTML = "❌ Scan Failed";
            alert(data.error);
            return;

        }

        document.getElementById("status").innerHTML = "✅ Scan Completed";

        document.getElementById("targetResult").innerHTML = data.target;

        document.getElementById("ipResult").innerHTML = data.ip;

        document.getElementById("totalPorts").innerHTML = data.total_open;

        document.getElementById("scanTime").innerHTML =
            data.time_taken + " seconds";

        let portsList = document.getElementById("portsList");

        portsList.innerHTML = "";

        if (data.open_ports.length === 0) {

            let li = document.createElement("li");

            li.innerHTML = "No Open Ports Found";

            portsList.appendChild(li);

        } else {

            data.open_ports.forEach(function(port) {

                let li = document.createElement("li");

                li.innerHTML = "Port " + port + " is Open";

                portsList.appendChild(li);

            });

        }

    } catch (error) {

        document.getElementById("status").innerHTML = "❌ Error";

        alert("Unable to connect to the server.");

    }

}