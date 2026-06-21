import json
import os
import psycopg2  # noqa: F401


def handler(event: dict, context) -> dict:
    """
    Проверяет наличие пользователя в Krosno Messenger по телефону или email.
    POST — добавляет нового пользователя.
    GET  — проверяет существование по query ?query=...
    """
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    try:
        if event.get("httpMethod") == "GET":
            q = (event.get("queryStringParameters") or {}).get("query", "").strip()
            if not q:
                return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Укажите телефон или email"})}

            cur.execute(
                "SELECT id, name FROM t_p74461000_beta_launch_project_.krosno_users WHERE phone = %s OR email = %s",
                (q, q),
            )
            row = cur.fetchone()
            if row:
                return {
                    "statusCode": 200,
                    "headers": {**cors, "Content-Type": "application/json"},
                    "body": json.dumps({"found": True, "name": row[1]}),
                }
            return {
                "statusCode": 200,
                "headers": {**cors, "Content-Type": "application/json"},
                "body": json.dumps({"found": False}),
            }

        if event.get("httpMethod") == "POST":
            data = json.loads(event.get("body") or "{}")
            name = (data.get("name") or "").strip()
            phone = (data.get("phone") or "").strip() or None
            email = (data.get("email") or "").strip() or None

            if not name or (not phone and not email):
                return {
                    "statusCode": 400,
                    "headers": cors,
                    "body": json.dumps({"error": "Укажите имя и хотя бы телефон или email"}),
                }

            cur.execute(
                "INSERT INTO t_p74461000_beta_launch_project_.krosno_users (name, phone, email) VALUES (%s, %s, %s) RETURNING id",
                (name, phone, email),
            )
            new_id = cur.fetchone()[0]
            conn.commit()
            return {
                "statusCode": 200,
                "headers": {**cors, "Content-Type": "application/json"},
                "body": json.dumps({"success": True, "id": new_id}),
            }

        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        cur.close()
        conn.close()