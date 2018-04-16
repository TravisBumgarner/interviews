# Play from console
# Enter a word  -> Hardcode to start
# Demonstrate length of word
# Show guesses remaining, start with 5 guesses

# hangman
# hangmanee

import string
import random

def get_random_word():
    with open('/usr/share/dict/words') as f:
        words = f.read().split('\n')
        idx = random.randint(0, len(words))
        return words[idx]

def get_secret_answer_spaces(user_answer):
    total_spaces = 0

    secret_input = []
    # take in user_answer and return the secret_input
    for character in user_answer:
        if character == " ":
            secret_input.append("_")
            total_spaces += 1
        else:
            secret_input.append("*")

    return secret_input, total_spaces

def play_hangman():
    user_answer = list(get_random_word())

    secret_input, total_spaces = get_secret_answer_spaces(user_answer)

    guesses_left = 5
    guesses_made = []
    characters_left_to_find = len(user_answer) - total_spaces # Users don't have to guess spaces in a phrase

    was_word_found = False
    print("Let's play hangman.")

    while guesses_left > 0 and not was_word_found:
        was_guess_found = False
        guess = raw_input("\nThe secret word is {}.\nEnter a letter (You have {} guesses remaining): ".format(" ".join(secret_input), guesses_left)).lower()

        if guess in guesses_made:
            print("You've already guessed that letter")
            continue
        else:
            guesses_made.append(guess)

        if len(guess) != 1 or guess not in string.ascii_lowercase:
            print("Must be a letter")
            continue

        for idx, letter in enumerate(user_answer):
            if guess == letter:
                secret_input[idx] = guess
                was_guess_found = True
                characters_left_to_find = characters_left_to_find - 1

        if not was_guess_found:
            guesses_left = guesses_left - 1

        if characters_left_to_find == 0:
            was_word_found = True
            break

    if was_word_found:
        print("Correct!")
    else:
        print("Sorry you lose, try again!")

if __name__ == "__main__":
    play_hangman()
    # get_random_word()

