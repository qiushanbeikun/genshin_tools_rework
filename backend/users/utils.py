import random
import string


def random_name():
    """
    Generate random string. Feature required by Django, non-nullable fields are required a default value.
    For now, usernames are not unique so this field is random but also non-unique
    :return: string in format "User_{random string with length 10}"
    """
    letters = string.ascii_letters
    return 'User_'.join(random.choice(letters) for i in range(10))


def validation(username, email, pw):
    if pw is None:
        raise TypeError('Users must have a password.')
    if email is None:
        raise TypeError('Users must have an email.')
    if username is None:
        raise TypeError('Users must have an username.')
