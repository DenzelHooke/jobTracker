import os
import uuid
from pathlib import Path
from account.models import Account


def writePDF(path, file):
    file_name = file.name
    with open(f'{path}/{file_name}', 'wb') as f:
        f.write(file.read())
        return f


def create_image_dir(userID, type):
    dir_name = f'{userID}-{uuid.uuid4()}'
    root_dir = Path(__file__).parent.parent.parent
    full_dir = f'{root_dir}/files/{dir_name}/'

    if type.lower() == "resume":
        dir_resume = f'{full_dir}/resume'
        os.makedirs(dir_resume)
        return dir_resume

    elif type.lower() == "cover":
        dir_cover = f'{full_dir}/cover'
        os.makedirs(dir_cover)
        return dir_cover
    else:
        raise Exception("Type must equal 'resume' or 'cover' to continue!")


def save_pdf_to_dir(file, path, type):

    if type == "resume":
        file = writePDF(path, file)

    elif type == "cover":
        file = writePDF(path, file)
    else:
        raise Exception("Type must equal 'resume' or 'cover' to continue!")

    return file


# def check_image_dir(user):
#     # image_dir_exist
