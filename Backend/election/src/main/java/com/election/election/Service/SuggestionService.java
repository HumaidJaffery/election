package com.election.election.Service;
import com.election.election.Entity.Comment;
import com.election.election.Entity.Suggestion;
import com.election.election.Repository.CommentRepository;
import com.election.election.Repository.SuggestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SuggestionService {
    @Autowired
    SuggestionRepository suggestionRepository;

    @Autowired
    CommentRepository commentRepository;

    public Suggestion addSuggestionService(Suggestion suggestion) {
        System.out.println(suggestion);
        return suggestionRepository.save(suggestion);
    }

    public Page<Suggestion> getPublicSuggestionsService(int page){
        Suggestion suggestion = new Suggestion(null, null, true, null, null);
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withIgnorePaths("suggestionId", "text", "likes", "comments");
        Example<Suggestion> ex = Example.of(suggestion, exampleMatcher);


        PageRequest pr = PageRequest.of(page, 10, Sort.by("likes").descending());
        return suggestionRepository.findAll(ex, pr);
    }


    public void addLike(long id, int likes){
        suggestionRepository.addOneLike(id, likes+1);
    }

    public Comment addComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Page<Comment> loadComments(long id, int page) {
        Comment comment = new Comment(null, null, suggestionRepository.findById(id).get());
        ExampleMatcher exampleMatcher = ExampleMatcher.matching().withIgnorePaths("commentId", "text");
        Example<Comment> ex = Example.of(comment, exampleMatcher);
        System.out.println(ex);

        PageRequest pr = PageRequest.of(page, 5);
        return commentRepository.findAll(ex, pr);
    }


}
