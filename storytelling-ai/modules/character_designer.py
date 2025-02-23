#character_designer.py
import spacy

# Load spaCy English model (ensure you've run: python -m spacy download en_core_web_sm)
nlp = spacy.load("en_core_web_sm")

def extract_traits(text):
    """
    Extracts potential character names from the text using named-entity recognition.
    For example, entities with labels 'PERSON' or 'ORG' are considered as character traits.
    """
    doc = nlp(text)
    traits = [ent.text for ent in doc.ents if ent.label_ in ["PERSON", "ORG"]]
    return list(set(traits))

'''
import spacy

# Load spaCy English model (run: python -m spacy download en_core_web_sm)
nlp = spacy.load("en_core_web_sm")

def extract_traits(text):
    doc = nlp(text)
    # Extract entities with labels like PERSON or ORG as example traits
    traits = [ent.text for ent in doc.ents if ent.label_ in ["PERSON", "ORG"]]
    return list(set(traits))
'''