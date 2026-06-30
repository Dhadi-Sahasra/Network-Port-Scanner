import socket
import time

def scan_ports(target, start_port, end_port):

    open_ports = []

    start_time = time.time()

    try:
        target_ip = socket.gethostbyname(target)
    except socket.gaierror:
        return {
            "error": "Invalid Hostname or IP Address"
        }

    for port in range(start_port, end_port + 1):

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        s.settimeout(0.5)

        result = s.connect_ex((target_ip, port))

        if result == 0:
            open_ports.append(port)

        s.close()

    end_time = time.time()

    return {
        "target": target,
        "ip": target_ip,
        "open_ports": open_ports,
        "total_open": len(open_ports),
        "time_taken": round(end_time - start_time, 2)
    }