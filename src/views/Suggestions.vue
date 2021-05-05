<template>
  <div class="flex flex-col bg-white h-full p-3">
    <v-btn fab text :to="{ name: 'home' }" exact>
      <v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <p class="text-center font-semibold">Buzón de sugerencias</p>
    <new-comment
      class="my-3"
      @send-comment="sendComment"
      :text.sync="commentText"
    ></new-comment>
    <v-divider class="my-2"></v-divider>
    <suggestion-card
      class="m-1"
      v-for="suggestion in suggestions"
      :key="suggestion.id"
      :message="suggestion.suggestion"
      :timestamp="suggestion.timestamp.toDate()"
      :dislikes="suggestion.dislikes"
      :likes="suggestion.likes"
      @vote="(val) => likeSuggestion(suggestion.id, val)"
    />
  </div>
</template>

<script>
const NewComment = () => import("@/components/NewComment.vue");
import { db, functions } from "../firebaseConfig";
const SuggestionCard = () => import("@/components/SuggestionCard.vue");
export default {
  components: {
    SuggestionCard,
    NewComment,
  },
  created() {
    db.collection("suggestions")
      .orderBy("totalLikes", "desc")
      .onSnapshot((snapshot) => {
        this.suggestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
  },
  data() {
    return {
      commentText: "",
      suggestions: [],
    };
  },
  methods: {
    async sendComment() {
      const votecomment = functions.httpsCallable("newSuggestion");
      await votecomment({ suggestion: this.commentText });
      this.commentText = "";
      window.alert("Sugerencia enviada.");
    },
    likeSuggestion(suggestionId, vote) {
      const voteSuggestion = functions.httpsCallable("voteSuggestion");
      voteSuggestion({ suggestionId, vote });
    },
  },
};
</script>

<style lang="scss" scoped></style>
