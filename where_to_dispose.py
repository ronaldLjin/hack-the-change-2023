from hugchat import hugchat
from hugchat.login import Login

# sign in to hugchat
EMAIL = "***REMOVED***"
PASSWORD = "***REMOVED***"
sign = Login(EMAIL, PASSWORD)
cookies = sign.login()
cookie_path_dir = "./cookies_snapshot"
sign.saveCookiesToDir(cookie_path_dir)


def where_to_dispose(item):
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())

    id = chatbot.new_conversation()
    query = f"Would a {item} fall under compost, garbage, recycling, e-waste, or hazardous waste? Give me a one word answer."
    query_result = chatbot.query(query)
    return str(query_result)
