import json
import os
from genericpath import exists


meta_folder = 'ASSETS/metadata'

if not os.path.exists(meta_folder):
    os.mkdir(meta_folder)

for i in range(1, 501):
    meta_name = "COLLIDER #" + str(i)
    meta_desc = "COLLIDERS are a collection of 500 generative art pieces inspired by particle accelerators."
    meta_image = "ipfs://bafybeienetjbvppmdxu4vtrex2356e6bvvks727dukabn4b4v536sjup2y/" + str(i) + ".png"
    meta_external = "https://colliders.club/id/"+ str(i)
    meta_att = {'trait_type':'Spokes', 'value':i}

    meta_dump = {'name': meta_name, 'description': meta_desc, 'image': meta_image, 'external_url': meta_external, 'attributes': meta_att}

    meta_file = meta_folder + '/' + str(i) + '.json'
    with open(meta_file, 'w') as f:
        json.dump(meta_dump, f)