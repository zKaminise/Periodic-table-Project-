from flask import Flask, request, jsonify, render_template
import json
from deep_translator import GoogleTranslator

app = Flask(__name__)

# Carrega os elementos do arquivo JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_element', methods=['POST'])
def get_element():
    element_symbol = request.json.get('symbol', '').strip().upper()
    response = {
        'status': 'not found',
        'element': None
    }

    for element in data['elements']:
        if element['symbol'].upper() == element_symbol:
            response['status'] = 'found'
            response['element'] = element
            break
        if element['name'].upper() == element_symbol:
            response['status'] = 'found'
            response['element'] = element
            break

    if response['status'] == 'found':
        translator = GoogleTranslator(source='en', target='pt')
        for key, value in response['element'].items():
            if isinstance(value, str):
                response['element'][key] = translator.translate(value)

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
