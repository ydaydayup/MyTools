import binascii

p = r"test_file.txt"
output_path = r"test.rar"
with open(p) as f:
    hex_string = f.read()
binary_s = binascii.a2b_hex(hex_string)
with open(output_path, "wb") as f:
    f.write(binary_s)
