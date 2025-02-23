# storytelling-ai/datasets/merge_files.py

import os

def merge_files(source_path, target_path, output_path):
    """
    Merges line-by-line data from source_path (.wp_source) and target_path (.wp_target)
    into a single text file. Each example is formatted with [PROMPT], [STORY], and a delimiter.
    """
    with open(source_path, "r", encoding="utf-8") as sf, \
         open(target_path, "r", encoding="utf-8") as tf, \
         open(output_path, "w", encoding="utf-8") as of:

        source_lines = sf.readlines()
        target_lines = tf.readlines()
        min_len = min(len(source_lines), len(target_lines))
        count = 0

        for i in range(min_len):
            s_line = source_lines[i].strip()
            t_line = target_lines[i].strip()
            if s_line and t_line:
                combined = f"[PROMPT]: {s_line}\n[STORY]: {t_line}\n<|endofexample|>\n"
                of.write(combined)
                count += 1

    print(f"Merged {count} lines from {source_path} and {target_path} into {output_path}")

def merge_all():
    """
    Merges .wp_source and .wp_target files for train, val, and test into single text files.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    merges = [
        ("train.wp_source", "train.wp_target", "train.txt"),
        ("valid.wp_source", "valid.wp_target", "valid.txt"),
        ("test.wp_source", "test.wp_target", "test.txt")
    ]

    for src, tgt, out_name in merges:
        src_path = os.path.join(base_dir, src)
        tgt_path = os.path.join(base_dir, tgt)
        out_path = os.path.join(base_dir, out_name)
        if os.path.exists(src_path) and os.path.exists(tgt_path):
            merge_files(src_path, tgt_path, out_path)
        else:
            print(f"Skipping merge for {out_name} because {src} or {tgt} not found.")

if __name__ == "__main__":
    merge_all()
